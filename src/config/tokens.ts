import { Token } from '@uniswap/sdk-core';

export interface TokenInfo {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI?: string;
  chainId: number;
}

// Common token addresses on Ethereum Mainnet
export const TOKEN_ADDRESSES: Record<number, Record<string, TokenInfo>> = {
  1: {
    // Ethereum Mainnet
    ETH: {
      symbol: 'ETH',
      name: 'Ethereum',
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      chainId: 1,
    },
    WETH: {
      symbol: 'WETH',
      name: 'Wrapped Ethereum',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      decimals: 18,
      chainId: 1,
    },
    USDC: {
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      decimals: 6,
      chainId: 1,
    },
    USDT: {
      symbol: 'USDT',
      name: 'Tether',
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6,
      chainId: 1,
    },
    DAI: {
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      decimals: 18,
      chainId: 1,
    },
    WBTC: {
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      decimals: 8,
      chainId: 1,
    },
  },
  5: {
    // Goerli Testnet
    ETH: {
      symbol: 'ETH',
      name: 'Ethereum',
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      chainId: 5,
    },
    WETH: {
      symbol: 'WETH',
      name: 'Wrapped Ethereum',
      address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
      decimals: 18,
      chainId: 5,
    },
    USDC: {
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
      decimals: 6,
      chainId: 5,
    },
  },
  11155111: {
    // Sepolia Testnet
    ETH: {
      symbol: 'ETH',
      name: 'Ethereum',
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      chainId: 11155111,
    },
    WETH: {
      symbol: 'WETH',
      name: 'Wrapped Ethereum',
      address: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
      decimals: 18,
      chainId: 11155111,
    },
    USDC: {
      symbol: 'USDC',
      name: 'USD Coin',
      address: '0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8',
      decimals: 6,
      chainId: 11155111,
    },
  },
};

export const getTokenInfo = (chainId: number, symbol: string): TokenInfo | null => {
  return TOKEN_ADDRESSES[chainId]?.[symbol] || null;
};

export const getTokenAddress = (chainId: number, symbol: string): string => {
  const token = getTokenInfo(chainId, symbol);
  if (!token) {
    throw new Error(`Token ${symbol} not found for chain ${chainId}`);
  }
  return token.address;
};

export const createUniswapToken = (tokenInfo: TokenInfo): Token => {
  return new Token(
    tokenInfo.chainId,
    tokenInfo.address,
    tokenInfo.decimals,
    tokenInfo.symbol,
    tokenInfo.name
  );
};

