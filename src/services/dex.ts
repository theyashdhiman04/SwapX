import { ethers } from 'ethers';
import { Token, CurrencyAmount, TradeType, Percent } from '@uniswap/sdk-core';
import { Pool, Route, Trade, computePoolAddress } from '@uniswap/v3-sdk';
import { Pair, Route as V2Route, Trade as V2Trade } from '@uniswap/v2-sdk';
import { walletService } from './wallet';
import { getTokenInfo, createUniswapToken, TokenInfo } from '@/config/tokens';
import { SUPPORTED_NETWORKS } from '@/config/networks';

export interface SwapQuote {
  dex: string;
  amountOut: string;
  amountOutFormatted: string;
  priceImpact: string;
  gasEstimate: string;
  route: string[];
  trade?: Trade<Token, Token, TradeType.EXACT_INPUT> | V2Trade<Token, Token, TradeType.EXACT_INPUT>;
}

export interface SwapRoute {
  name: string;
  quote: SwapQuote;
  savings?: string;
  isBest: boolean;
}

// Uniswap V3 Pool Factory Address (same on mainnet and common testnets)
const UNISWAP_V3_FACTORY = '0x1F98431c8aD98523631AE4a59f267346ea31F984';

// Uniswap V2 Router / Factory addresses by network
// Mainnet + Goerli share the canonical addresses; Sepolia uses separate deployments
const UNISWAP_V2_ROUTER_ADDRESSES: Record<number, string> = {
  1: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Ethereum mainnet
  5: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D', // Goerli
  11155111: '0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3', // Sepolia
};

const UNISWAP_V2_FACTORY_ADDRESSES: Record<number, string> = {
  1: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', // Mainnet
  5: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f', // Goerli
  11155111: '0xF62c03E08ada871A0bEb309762E260a7a6a880E6', // Sepolia
};

// SushiSwap Router Address by network (only mainnet explicitly supported)
const SUSHI_ROUTER_ADDRESSES: Record<number, string> = {
  1: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
};

const getUniswapV2RouterAddress = (chainId: number): string => {
  const address = UNISWAP_V2_ROUTER_ADDRESSES[chainId];
  if (!address) {
    throw new Error(`Uniswap V2 router not configured for chain ${chainId}`);
  }
  return address;
};

const getUniswapV2FactoryAddress = (chainId: number): string => {
  const address = UNISWAP_V2_FACTORY_ADDRESSES[chainId];
  if (!address) {
    throw new Error(`Uniswap V2 factory not configured for chain ${chainId}`);
  }
  return address;
};

const getSushiRouterAddress = (chainId: number): string | null => {
  return SUSHI_ROUTER_ADDRESSES[chainId] ?? null;
};

// Common fee tiers for Uniswap V3
const FEE_TIERS = [500, 3000, 10000];

class DEXService {
  private provider: ethers.BrowserProvider | null = null;

  private getEthereumProvider(): any {
    // Check for standard ethereum provider
    if (typeof window !== 'undefined' && window.ethereum) {
      return window.ethereum;
    }

    // Check for mobile MetaMask (sometimes injected differently)
    if (typeof window !== 'undefined' && (window as any).web3?.currentProvider) {
      return (window as any).web3.currentProvider;
    }

    // Check for ethereum in different locations (mobile browsers)
    if (typeof window !== 'undefined' && (window as any).ethereum) {
      return (window as any).ethereum;
    }

    return null;
  }

  async initialize() {
    // First try to get provider from wallet service
    this.provider = walletService.getProvider();
    
    // If no provider, check if wallet is connected and initialize
    if (!this.provider) {
      const ethereum = this.getEthereumProvider();
      if (ethereum) {
        try {
          // Check if wallet is connected
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            // Wallet is connected, create provider
            this.provider = new ethers.BrowserProvider(ethereum);
          } else {
            throw new Error('Wallet not connected. Please connect your MetaMask wallet.');
          }
        } catch (error: any) {
          throw new Error(`Failed to initialize provider: ${error.message || 'Unknown error'}`);
        }
      } else {
        throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
      }
    }
  }

  async getQuotes(
    chainId: number,
    tokenInSymbol: string,
    tokenOutSymbol: string,
    amountIn: string
  ): Promise<SwapRoute[]> {
    console.log('getQuotes called:', { chainId, tokenInSymbol, tokenOutSymbol, amountIn });
    
    try {
      await this.initialize();
    } catch (error: any) {
      console.error('Failed to initialize provider:', error);
      throw new Error(`Failed to initialize: ${error.message}`);
    }

    if (!this.provider) {
      console.error('Provider is null after initialization');
      throw new Error('Provider not initialized');
    }

    // Use WETH for ETH swaps (Uniswap uses WETH internally)
    const actualTokenInSymbol = tokenInSymbol === 'ETH' ? 'WETH' : tokenInSymbol;
    const actualTokenOutSymbol = tokenOutSymbol === 'ETH' ? 'WETH' : tokenOutSymbol;

    console.log('Token conversion:', {
      original: { tokenInSymbol, tokenOutSymbol },
      actual: { actualTokenInSymbol, actualTokenOutSymbol },
    });

    const tokenInInfo = getTokenInfo(chainId, actualTokenInSymbol);
    const tokenOutInfo = getTokenInfo(chainId, actualTokenOutSymbol);

    console.log('Token info:', {
      tokenInInfo: tokenInInfo ? { symbol: tokenInInfo.symbol, address: tokenInInfo.address } : null,
      tokenOutInfo: tokenOutInfo ? { symbol: tokenOutInfo.symbol, address: tokenOutInfo.address } : null,
    });

    if (!tokenInInfo || !tokenOutInfo) {
      console.error('Token not found:', { chainId, actualTokenInSymbol, actualTokenOutSymbol });
      throw new Error(`Token not found for chain ${chainId}. TokenIn: ${actualTokenInSymbol}, TokenOut: ${actualTokenOutSymbol}`);
    }

    const tokenIn = createUniswapToken(tokenInInfo);
    const tokenOut = createUniswapToken(tokenOutInfo);
    const amountInWei = ethers.parseUnits(amountIn, tokenInInfo.decimals);
    const amountInCurrency = CurrencyAmount.fromRawAmount(tokenIn, amountInWei.toString());

    const quotes: SwapRoute[] = [];

    try {
      // Uniswap V3 Quote
      const uniswapV3Quote = await this.getUniswapV3Quote(
        chainId,
        tokenIn,
        tokenOut,
        amountInCurrency
      );
      if (uniswapV3Quote) {
        quotes.push({
          name: 'Uniswap V3',
          quote: uniswapV3Quote,
          isBest: false,
        });
      }
    } catch (error) {
      console.error('Uniswap V3 quote error:', error);
    }

    try {
      // Uniswap V2 Quote (as fallback)
      const uniswapV2Quote = await this.getUniswapV2Quote(
        chainId,
        tokenIn,
        tokenOut,
        amountInCurrency
      );
      if (uniswapV2Quote) {
        quotes.push({
          name: 'Uniswap V2',
          quote: uniswapV2Quote,
          isBest: false,
        });
      }
    } catch (error) {
      console.error('Uniswap V2 quote error:', error);
    }

    try {
      // SushiSwap Quote
      const sushiSwapQuote = await this.getSushiSwapQuote(
        chainId,
        tokenIn,
        tokenOut,
        amountInCurrency
      );
      if (sushiSwapQuote) {
        quotes.push({
          name: 'SushiSwap',
          quote: sushiSwapQuote,
          isBest: false,
        });
      }
    } catch (error) {
      console.error('SushiSwap quote error:', error);
    }

    try {
      // 1inch Quote
      const oneInchQuote = await this.get1InchQuote(
        chainId,
        tokenInInfo,
        tokenOutInfo,
        amountIn
      );
      // Only add 1inch quote if it has a valid non-zero amount
      if (oneInchQuote && parseFloat(oneInchQuote.amountOutFormatted) > 0) {
        quotes.push({
          name: '1inch',
          quote: oneInchQuote,
          isBest: false,
        });
      } else if (oneInchQuote) {
        console.warn('1inch quote returned zero amount, skipping');
      }
    } catch (error) {
      console.error('1inch quote error:', error);
    }

    // If no quotes found, provide a fallback estimate using router
    if (quotes.length === 0) {
      console.log('No quotes from DEXs, trying fallback quote...');
      // Try to get a simple estimate using Uniswap V2 router's getAmountsOut
      try {
        const fallbackQuote = await this.getFallbackQuote(
          chainId,
          tokenInInfo,
          tokenOutInfo,
          amountIn
        );
        if (fallbackQuote) {
          console.log('Fallback quote received:', fallbackQuote);
          quotes.push({
            name: 'Uniswap V2',
            quote: fallbackQuote,
            isBest: true,
          });
        } else {
          console.warn('Fallback quote returned null - this might indicate no liquidity or network issues');
        }
      } catch (error: any) {
        console.error('Fallback quote error:', error);
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          chainId,
          tokenIn: tokenInInfo.symbol,
          tokenOut: tokenOutInfo.symbol,
        });
        // Don't add mock quote - let the error propagate so user knows something is wrong
        throw new Error(`Failed to get quotes: ${error.message}`);
      }
    }

    // Validate all quotes before marking best - filter out invalid ones
    const validQuotes = quotes.filter(quote => {
      const amount = parseFloat(quote.quote.amountOutFormatted);
      const inputAmount = parseFloat(amountIn);
      
      // Reject NaN amounts
      if (isNaN(amount)) {
        console.warn('Quote has NaN amount:', {
          dex: quote.name,
          amount: quote.quote.amountOutFormatted,
        });
        return false;
      }
      
      // Reject zero amounts - they're not useful quotes
      if (amount === 0) {
        console.warn('Quote has zero amount (no liquidity?), rejecting:', {
          dex: quote.name,
        });
        return false;
      }
      
      // Final validation: reject quotes that are clearly wrong (decimal bugs)
      // For ETH -> USDC: reasonable range is 1000-5000 USDC per ETH
      const expectedMin = inputAmount * 1000;
      const expectedMax = inputAmount * 5000;
      
      // Only reject if amount is suspiciously large (decimal bug) - allow small amounts
      if (amount > expectedMax * 100) {
        console.warn('Rejecting invalid quote (too large):', {
          dex: quote.name,
          amount,
          expectedRange: `${expectedMin} - ${expectedMax}`,
        });
        return false;
      }
      
      return true;
    });

    // Filter out zero amounts - only return quotes with actual values
    const nonZeroQuotes = validQuotes.filter(q => parseFloat(q.quote.amountOutFormatted) > 0);
    
    if (nonZeroQuotes.length > 0) {
      // Mark best quote from non-zero quotes only
      const bestQuote = nonZeroQuotes.reduce((best, current) => {
        const bestAmount = parseFloat(best.quote.amountOutFormatted);
        const currentAmount = parseFloat(current.quote.amountOutFormatted);
        return currentAmount > bestAmount ? current : best;
      });

      bestQuote.isBest = true;
      
      // Calculate savings
      nonZeroQuotes.forEach(quote => {
        if (quote !== bestQuote) {
          const savings = parseFloat(bestQuote.quote.amountOutFormatted) - parseFloat(quote.quote.amountOutFormatted);
          quote.savings = savings > 0 ? `-$${savings.toFixed(2)}` : '';
        }
      });
      
      console.log('Best quote selected:', {
        name: bestQuote.name,
        amount: bestQuote.quote.amountOutFormatted,
        totalNonZeroQuotes: nonZeroQuotes.length,
      });
      
      return nonZeroQuotes; // Only return non-zero quotes
    }
    
    // If we have no non-zero quotes, throw an error
    console.error('No valid quotes available (all zero or filtered):', {
      chainId,
      tokenInSymbol,
      tokenOutSymbol,
      amountIn,
      totalQuotesAttempted: quotes.length,
      validQuotesCount: validQuotes.length,
    });
    throw new Error(`No quotes available for ${amountIn} ${tokenInSymbol} → ${tokenOutSymbol} on chain ${chainId}. This might indicate:\n- No liquidity pool exists for this pair\n- Network/RPC issues\n- Please try a different amount or token pair`);
  }

  private async getUniswapV3Quote(
    chainId: number,
    tokenIn: Token,
    tokenOut: Token,
    amountIn: CurrencyAmount<Token>
  ): Promise<SwapQuote | null> {
    if (!this.provider) return null;

    try {
      // Try different fee tiers
      for (const fee of FEE_TIERS) {
        try {
          const poolAddress = computePoolAddress({
            factoryAddress: UNISWAP_V3_FACTORY,
            tokenA: tokenIn,
            tokenB: tokenOut,
            fee,
          });

          const poolContract = new ethers.Contract(
            poolAddress,
            [
              'function liquidity() external view returns (uint128)',
              'function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)',
            ],
            this.provider
          );

          const [liquidity, slot0] = await Promise.all([
            poolContract.liquidity(),
            poolContract.slot0(),
          ]);

          if (liquidity > 0n && slot0.sqrtPriceX96 > 0n) {
            // Create pool instance
            const pool = new Pool(
              tokenIn,
              tokenOut,
              fee,
              slot0.sqrtPriceX96.toString(),
              liquidity.toString(),
              slot0.tick
            );

            // Create route
            const route = new Route([pool], tokenIn, tokenOut);

            // Create trade
            const trade = Trade.exactIn(route, amountIn);

            const amountOut = trade.outputAmount.toExact();
            const priceImpact = trade.priceImpact.toFixed(2);

            return {
              dex: 'Uniswap V3',
              amountOut: trade.outputAmount.quotient.toString(),
              amountOutFormatted: amountOut,
              priceImpact: `${priceImpact}%`,
              gasEstimate: '$2.50',
              route: [tokenIn.symbol || '', tokenOut.symbol || ''],
              trade: trade as any,
            };
          }
        } catch (error) {
          // Try next fee tier
          continue;
        }
      }
    } catch (error) {
      console.error('Uniswap V3 error:', error);
    }

    return null;
  }

  private async getUniswapV2Quote(
    chainId: number,
    tokenIn: Token,
    tokenOut: Token,
    amountIn: CurrencyAmount<Token>
  ): Promise<SwapQuote | null> {
    if (!this.provider) return null;

    try {
      const factoryAddress = getUniswapV2FactoryAddress(chainId);
      const factoryABI = [
        'function getPair(address tokenA, address tokenB) external view returns (address pair)',
      ];

      const factoryContract = new ethers.Contract(factoryAddress, factoryABI, this.provider);
      const pairAddress = await factoryContract.getPair(tokenIn.address, tokenOut.address);

      if (pairAddress === ethers.ZeroAddress) {
        return null;
      }

      const pairABI = [
        'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
        'function token0() external view returns (address)',
      ];

      const pairContract = new ethers.Contract(pairAddress, pairABI, this.provider);
      const [reserves, token0Address] = await Promise.all([
        pairContract.getReserves(),
        pairContract.token0(),
      ]);

      // Determine which token is token0 in the pair (based on address ordering)
      const isTokenInToken0 = token0Address.toLowerCase() === tokenIn.address.toLowerCase();
      const pairToken0 = isTokenInToken0 ? tokenIn : tokenOut;
      const pairToken1 = isTokenInToken0 ? tokenOut : tokenIn;

      // Map reserves correctly: reserve0 is always for token0, reserve1 is always for token1
      const reserve0 = reserves.reserve0;
      const reserve1 = reserves.reserve1;

      const pair = new Pair(
        CurrencyAmount.fromRawAmount(pairToken0, reserve0.toString()),
        CurrencyAmount.fromRawAmount(pairToken1, reserve1.toString())
      );

      const route = new V2Route([pair], tokenIn, tokenOut);
      const trade = V2Trade.exactIn(route, amountIn);

      const amountOutFormatted = trade.outputAmount.toExact();
      const amountOutNum = parseFloat(amountOutFormatted);
      
      // Validate the quote - only reject if suspiciously large (decimal bug)
      // Don't reject small amounts - they might be valid for small inputs
      const inputAmountNum = parseFloat(amountIn.toExact());
      const expectedMax = inputAmountNum * 5000; // 1 ETH = 5000 USDC maximum
      
      // Only reject if suspiciously large (decimal conversion bug)
      // Allow small amounts and zero - they'll be filtered in final validation
      if (amountOutNum > expectedMax * 100) {
        console.error('Uniswap V2 SDK quote validation failed (too large):', {
          input: amountIn.toExact(),
          output: amountOutFormatted,
          expectedMax: expectedMax * 100,
          actual: amountOutNum,
        });
        return null;
      }

      return {
        dex: 'Uniswap V2',
        amountOut: trade.outputAmount.quotient.toString(),
        amountOutFormatted: amountOutFormatted,
        priceImpact: trade.priceImpact.toFixed(2),
        gasEstimate: '$2.80',
        route: [tokenIn.symbol || '', tokenOut.symbol || ''],
        trade: trade as any,
      };
    } catch (error) {
      console.error('Uniswap V2 error:', error);
      return null;
    }
  }

  private async getSushiSwapQuote(
    chainId: number,
    tokenIn: Token,
    tokenOut: Token,
    amountIn: CurrencyAmount<Token>
  ): Promise<SwapQuote | null> {
    if (!this.provider) return null;

    try {
      // SushiSwap Factory Address (only explicitly supporting mainnet here)
      if (chainId !== 1) {
        // SushiSwap is not configured on this network; skip gracefully
        return null;
      }

      const factoryAddress = '0xC0AEe478e3658e2610c5F7A4A2E1777cE9e4f2Ac';
      
      const factoryABI = [
        'function getPair(address tokenA, address tokenB) external view returns (address pair)',
      ];

      const factoryContract = new ethers.Contract(factoryAddress, factoryABI, this.provider);
      const pairAddress = await factoryContract.getPair(tokenIn.address, tokenOut.address);

      if (pairAddress === ethers.ZeroAddress) {
        return null;
      }

      const pairABI = [
        'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)',
        'function token0() external view returns (address)',
      ];

      const pairContract = new ethers.Contract(pairAddress, pairABI, this.provider);
      const [reserves, token0Address] = await Promise.all([
        pairContract.getReserves(),
        pairContract.token0(),
      ]);

      // Determine which token is token0 in the pair (based on address ordering)
      const isTokenInToken0 = token0Address.toLowerCase() === tokenIn.address.toLowerCase();
      const pairToken0 = isTokenInToken0 ? tokenIn : tokenOut;
      const pairToken1 = isTokenInToken0 ? tokenOut : tokenIn;

      // Map reserves correctly: reserve0 is always for token0, reserve1 is always for token1
      const reserve0 = reserves.reserve0;
      const reserve1 = reserves.reserve1;

      const pair = new Pair(
        CurrencyAmount.fromRawAmount(pairToken0, reserve0.toString()),
        CurrencyAmount.fromRawAmount(pairToken1, reserve1.toString())
      );

      const route = new V2Route([pair], tokenIn, tokenOut);
      const trade = V2Trade.exactIn(route, amountIn);

      const amountOutFormatted = trade.outputAmount.toExact();
      const amountOutNum = parseFloat(amountOutFormatted);
      
      // Validate the quote - only reject if suspiciously large (decimal bug)
      const inputAmountNum = parseFloat(amountIn.toExact());
      const expectedMax = inputAmountNum * 5000; // 1 ETH = 5000 USDC maximum
      
      // Only reject if suspiciously large (decimal conversion bug)
      if (amountOutNum > expectedMax * 100) {
        console.error('SushiSwap SDK quote validation failed (too large):', {
          input: amountIn.toExact(),
          output: amountOutFormatted,
          expectedMax: expectedMax * 100,
          actual: amountOutNum,
        });
        return null;
      }

      return {
        dex: 'SushiSwap',
        amountOut: trade.outputAmount.quotient.toString(),
        amountOutFormatted: amountOutFormatted,
        priceImpact: trade.priceImpact.toFixed(2),
        gasEstimate: '$2.75',
        route: [tokenIn.symbol || '', tokenOut.symbol || ''],
        trade: trade as any,
      };
    } catch (error) {
      console.error('SushiSwap error:', error);
      return null;
    }
  }

  private async getFallbackQuote(
    chainId: number,
    tokenIn: TokenInfo,
    tokenOut: TokenInfo,
    amountIn: string
  ): Promise<SwapQuote | null> {
    if (!this.provider) {
      // Try to initialize provider if not set
      await this.initialize();
      if (!this.provider) return null;
    }

    try {
      const routerAddress = getUniswapV2RouterAddress(chainId);
      const routerABI = [
        'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
      ];

      const routerContract = new ethers.Contract(routerAddress, routerABI, this.provider);
      
      // Build path
      // Note: tokenIn is already WETH if original was ETH (converted in getQuotes)
      // The router expects token addresses, not zero address for ETH
      let path: string[];
      
      // If tokenOut is ETH/WETH, we need WETH address
      if (tokenOut.symbol === 'WETH' || tokenOut.symbol === 'ETH') {
        const wethInfo = getTokenInfo(chainId, 'WETH');
        if (!wethInfo) {
          console.error('WETH not found for chain', chainId);
          return null;
        }
        // If tokenIn is also WETH, this is a same-token swap (shouldn't happen, but handle it)
        if (tokenIn.symbol === 'WETH' || tokenIn.symbol === 'ETH') {
          path = [wethInfo.address];
        } else {
          path = [tokenIn.address, wethInfo.address];
        }
      } else {
        // Normal token to token swap
        path = [tokenIn.address, tokenOut.address];
      }
      
      // Parse amount using tokenIn decimals (should be correct since tokenIn is already the right token)
      const amountInWei = ethers.parseUnits(amountIn, tokenIn.decimals);

      console.log('Fetching fallback quote:', {
        path,
        pathAddresses: path,
        amountIn: amountIn,
        amountInWei: amountInWei.toString(),
        tokenIn: tokenIn.symbol,
        tokenOut: tokenOut.symbol,
        tokenOutDecimals: tokenOut.decimals,
      });

      const amountsOut = await routerContract.getAmountsOut(amountInWei, path);
      console.log('Router response (amountsOut array):', amountsOut.map((a: bigint) => a.toString()));
      
      const rawAmountOut = amountsOut[amountsOut.length - 1];
      console.log('Raw amount out (last element):', rawAmountOut.toString());
      
      // Format the amount using the correct decimals
      let amountOut = ethers.formatUnits(rawAmountOut, tokenOut.decimals);
      const amountOutNum = parseFloat(amountOut);
      
      console.log('Formatted amount:', amountOut, 'as number:', amountOutNum);
      
      // Sanity check: For ETH -> USDC swaps
      // At current rates (~$2000-3000/ETH), 0.001 ETH should give ~2-3 USDC
      // Reject if amount is clearly wrong (more than 100x expected max)
      const expectedMin = parseFloat(amountIn) * 1000; // Conservative minimum (1 ETH = 1000 USDC)
      const expectedMax = parseFloat(amountIn) * 5000; // Conservative maximum (1 ETH = 5000 USDC)
      
      // Reject if amount is clearly wrong - catch decimal bugs
      // But allow very small amounts (they might be valid for tiny inputs)
      if (amountOutNum > expectedMax * 100) {
        console.error('ERROR: Amount validation failed!', {
          input: amountIn,
          output: amountOut,
          outputNum: amountOutNum,
          expectedRange: `${expectedMin} - ${expectedMax}`,
          actual: amountOutNum,
          rawAmountOut: rawAmountOut.toString(),
          tokenOutDecimals: tokenOut.decimals,
        });
        console.error('This indicates a decimal conversion bug. Returning null.');
        return null;
      }
      
      // Don't reject small amounts - they might be valid for very small inputs
      // Only log a warning if it seems suspiciously low
      if (amountOutNum < expectedMin / 100 && parseFloat(amountIn) > 0.001) {
        console.warn('Amount seems low but accepting it:', {
          input: amountIn,
          output: amountOut,
          expectedMin,
        });
      }
      
      // Don't reject small amounts - they might be valid for very small inputs
      // Only log a warning
      if (amountOutNum < expectedMin / 10 && parseFloat(amountIn) > 0.001) {
        console.warn('Amount seems low but might be valid:', {
          input: amountIn,
          output: amountOut,
          expectedMin,
        });
      }

      console.log('Fallback quote validated successfully:', amountOut);

      return {
        dex: 'Uniswap V2',
        amountOut: amountsOut[amountsOut.length - 1].toString(),
        amountOutFormatted: amountOut,
        priceImpact: '0.1%',
        gasEstimate: '$2.80',
        route: [tokenIn.symbol, tokenOut.symbol],
      };
    } catch (error: any) {
      console.error('Fallback quote error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        data: error.data,
      });
      return null;
    }
  }

  private async get1InchQuote(
    chainId: number,
    tokenIn: TokenInfo,
    tokenOut: TokenInfo,
    amountIn: string
  ): Promise<SwapQuote | null> {
    try {
      // 1inch API endpoint
      const apiUrl = `https://api.1inch.dev/swap/v6.0/${chainId}/quote`;
      
      const params = new URLSearchParams({
        src: tokenIn.address,
        dst: tokenOut.address,
        amount: ethers.parseUnits(amountIn, tokenIn.decimals).toString(),
      });

      const response = await fetch(`${apiUrl}?${params.toString()}`, {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY', // Note: You'll need a 1inch API key
        },
      });

      if (!response.ok) {
        // Don't return a zero quote - return null so it's not added
        console.warn('1inch API returned error:', response.status, response.statusText);
        return null;
      }

      const data = await response.json();
      const amountOut = ethers.formatUnits(data.toAmount, tokenOut.decimals);

      return {
        dex: '1inch',
        amountOut: data.toAmount,
        amountOutFormatted: amountOut,
        priceImpact: '0.1%',
        gasEstimate: '$2.60',
        route: [tokenIn.symbol, tokenOut.symbol],
      };
    } catch (error) {
      console.error('1inch API error:', error);
      // Return null instead of zero quote
      return null;
    }
  }
}

export const dexService = new DEXService();

