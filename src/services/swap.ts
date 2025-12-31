import { ethers } from 'ethers';
import { SwapRoute } from './dex';
import { walletService } from './wallet';
import { getTokenInfo } from '@/config/tokens';

export interface SwapParams {
  route: SwapRoute;
  tokenInSymbol: string;
  tokenOutSymbol: string;
  amountIn: string;
  slippageTolerance: number; // percentage (e.g., 0.5 for 0.5%)
  recipient?: string;
}

export interface SwapResult {
  hash: string;
  success: boolean;
  error?: string;
}

class SwapService {
  // Uniswap V2 Router ABI (simplified)
  private UNISWAP_V2_ROUTER_ABI = [
    'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
    'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
    'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
    'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
  ];

  private UNISWAP_V2_ROUTER = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
  private SUSHI_ROUTER = '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F';

  async executeSwap(params: SwapParams): Promise<SwapResult> {
    const signer = walletService.getSigner();
    if (!signer) {
      throw new Error('Wallet not connected');
    }

    const chainId = Number((await signer.provider.getNetwork()).chainId);
    const recipient = params.recipient || (await signer.getAddress());

    try {
      // Check which DEX the route uses
      const routeName = params.route.name.toLowerCase();
      if (routeName.includes('sushi')) {
        return await this.executeSushiSwap(params, signer, chainId, recipient);
      } else {
        return await this.executeUniswapV2Swap(params, signer, chainId, recipient);
      }
    } catch (error: any) {
      console.error('Swap error:', error);
      
      // Extract user-friendly error message
      let errorMessage = error.message || "Unknown error occurred";
      
      // Remove raw transaction data from error messages
      if (errorMessage.includes("insufficient funds")) {
        errorMessage = "insufficient funds";
      } else if (errorMessage.includes("user rejected") || errorMessage.includes("User denied")) {
        errorMessage = "user rejected transaction";
      } else if (errorMessage.includes("transaction")) {
        // Extract just the error reason, not the full transaction object
        const match = errorMessage.match(/(insufficient funds|execution reverted|gas|slippage|network|timeout)/i);
        if (match) {
          errorMessage = match[1].toLowerCase();
        } else {
          // Remove transaction data but keep the error type
          errorMessage = errorMessage.split("transaction")[0].trim() || "transaction failed";
        }
      }
      
      throw new Error(`Swap failed: ${errorMessage}`);
    }
  }

  private async executeUniswapV2Swap(
    params: SwapParams,
    signer: ethers.JsonRpcSigner,
    chainId: number,
    recipient: string
  ): Promise<SwapResult> {
    const { tokenInSymbol, tokenOutSymbol, amountIn, slippageTolerance } = params;

    const tokenInInfo = getTokenInfo(chainId, tokenInSymbol);
    const tokenOutInfo = getTokenInfo(chainId, tokenOutSymbol);
    const wethInfo = getTokenInfo(chainId, 'WETH');

    if (!tokenInInfo || !tokenOutInfo) {
      throw new Error('Token info not found');
    }

    if ((tokenInSymbol === 'ETH' || tokenOutSymbol === 'ETH') && !wethInfo) {
      throw new Error('WETH not found for this network');
    }

    const router = new ethers.Contract(
      this.UNISWAP_V2_ROUTER,
      this.UNISWAP_V2_ROUTER_ABI,
      signer
    );

    const amountInWei = ethers.parseUnits(amountIn, tokenInInfo.decimals);
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

    // Build swap path (ETH uses WETH in the path)
    let path: string[];
    if (tokenInSymbol === 'ETH') {
      path = [wethInfo!.address, tokenOutInfo.address];
    } else if (tokenOutSymbol === 'ETH') {
      path = [tokenInInfo.address, wethInfo!.address];
    } else {
      path = [tokenInInfo.address, tokenOutInfo.address];
    }

    // Calculate minimum amount out with slippage
    const amountsOut = await router.getAmountsOut(amountInWei, path);
    const amountOutMin = amountsOut[1];
    const slippageAmount = (amountOutMin * BigInt(Math.floor(slippageTolerance * 100))) / BigInt(10000);
    const finalAmountOutMin = amountOutMin - slippageAmount;

    let tx: ethers.ContractTransactionResponse;

    // Handle ETH swaps
    if (tokenInSymbol === 'ETH') {
      // Swap ETH for tokens (uses WETH internally)
      tx = await router.swapExactETHForTokens(
        finalAmountOutMin,
        path,
        recipient,
        deadline,
        { value: amountInWei }
      );
    } else if (tokenOutSymbol === 'ETH') {
      // Swap tokens for ETH (uses WETH internally)
      // First approve the router to spend tokens
      await this.approveToken(tokenInInfo.address, this.UNISWAP_V2_ROUTER, amountInWei, signer);
      
      tx = await router.swapExactTokensForETH(
        amountInWei,
        finalAmountOutMin,
        path,
        recipient,
        deadline
      );
    } else {
      // Swap tokens for tokens
      // First approve the router to spend tokens
      await this.approveToken(tokenInInfo.address, this.UNISWAP_V2_ROUTER, amountInWei, signer);
      
      tx = await router.swapExactTokensForTokens(
        amountInWei,
        finalAmountOutMin,
        path,
        recipient,
        deadline
      );
    }

    const receipt = await tx.wait();

    return {
      hash: receipt!.hash,
      success: receipt!.status === 1,
    };
  }

  private async approveToken(
    tokenAddress: string,
    spender: string,
    amount: bigint,
    signer: ethers.JsonRpcSigner
  ): Promise<void> {
    // ERC20 ABI
    const erc20ABI = [
      'function approve(address spender, uint256 amount) external returns (bool)',
      'function allowance(address owner, address spender) external view returns (uint256)',
    ];

    const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);
    const owner = await signer.getAddress();

    // Check current allowance
    const currentAllowance = await tokenContract.allowance(owner, spender);

    if (currentAllowance < amount) {
      // Approve the router to spend tokens
      const approveTx = await tokenContract.approve(spender, ethers.MaxUint256);
      await approveTx.wait();
    }
  }

  private async executeSushiSwap(
    params: SwapParams,
    signer: ethers.JsonRpcSigner,
    chainId: number,
    recipient: string
  ): Promise<SwapResult> {
    const { tokenInSymbol, tokenOutSymbol, amountIn, slippageTolerance } = params;

    const tokenInInfo = getTokenInfo(chainId, tokenInSymbol);
    const tokenOutInfo = getTokenInfo(chainId, tokenOutSymbol);
    const wethInfo = getTokenInfo(chainId, 'WETH');

    if (!tokenInInfo || !tokenOutInfo) {
      throw new Error('Token info not found');
    }

    if ((tokenInSymbol === 'ETH' || tokenOutSymbol === 'ETH') && !wethInfo) {
      throw new Error('WETH not found for this network');
    }

    const router = new ethers.Contract(
      this.SUSHI_ROUTER,
      this.UNISWAP_V2_ROUTER_ABI, // Same ABI as Uniswap V2
      signer
    );

    const amountInWei = ethers.parseUnits(amountIn, tokenInInfo.decimals);
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

    // Build swap path (ETH uses WETH in the path)
    let path: string[];
    if (tokenInSymbol === 'ETH') {
      path = [wethInfo!.address, tokenOutInfo.address];
    } else if (tokenOutSymbol === 'ETH') {
      path = [tokenInInfo.address, wethInfo!.address];
    } else {
      path = [tokenInInfo.address, tokenOutInfo.address];
    }

    // Calculate minimum amount out with slippage
    const amountsOut = await router.getAmountsOut(amountInWei, path);
    const amountOutMin = amountsOut[1];
    const slippageAmount = (amountOutMin * BigInt(Math.floor(slippageTolerance * 100))) / BigInt(10000);
    const finalAmountOutMin = amountOutMin - slippageAmount;

    let tx: ethers.ContractTransactionResponse;

    // Handle ETH swaps
    if (tokenInSymbol === 'ETH') {
      // Swap ETH for tokens (uses WETH internally)
      tx = await router.swapExactETHForTokens(
        finalAmountOutMin,
        path,
        recipient,
        deadline,
        { value: amountInWei }
      );
    } else if (tokenOutSymbol === 'ETH') {
      // Swap tokens for ETH (uses WETH internally)
      // First approve the router to spend tokens
      await this.approveToken(tokenInInfo.address, this.SUSHI_ROUTER, amountInWei, signer);
      
      tx = await router.swapExactTokensForETH(
        amountInWei,
        finalAmountOutMin,
        path,
        recipient,
        deadline
      );
    } else {
      // Swap tokens for tokens
      // First approve the router to spend tokens
      await this.approveToken(tokenInInfo.address, this.SUSHI_ROUTER, amountInWei, signer);
      
      tx = await router.swapExactTokensForTokens(
        amountInWei,
        finalAmountOutMin,
        path,
        recipient,
        deadline
      );
    }

    const receipt = await tx.wait();

    return {
      hash: receipt!.hash,
      success: receipt!.status === 1,
    };
  }

  async executeSwapWithFallback(params: SwapParams, allRoutes: SwapRoute[]): Promise<SwapResult> {
    // Sort routes by best rate
    const sortedRoutes = [...allRoutes].sort((a, b) => {
      const amountA = parseFloat(a.quote.amountOutFormatted);
      const amountB = parseFloat(b.quote.amountOutFormatted);
      return amountB - amountA;
    });

    let lastError: Error | null = null;

    // Try each route in order
    for (const route of sortedRoutes) {
      try {
        const result = await this.executeSwap({ ...params, route });
        return result;
      } catch (error: any) {
        lastError = error;
        console.warn(`Route ${route.name} failed, trying next...`);
        continue;
      }
    }

    throw lastError || new Error('All swap routes failed');
  }
}

export const swapService = new SwapService();
