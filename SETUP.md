# Quick Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **MetaMask** browser extension installed
3. **npm** or **yarn** package manager

## Installation Steps

1. **Install dependencies:**
```bash
npm install
```

2. **Start development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to `http://localhost:8080`

## First Time Usage

1. **Connect MetaMask:**
   - Click "Connect" button in the navbar
   - Approve the connection in MetaMask popup
   - Your wallet address will appear

2. **Switch to Supported Network:**
   - The app supports Ethereum Mainnet, Goerli, and Sepolia
   - Make sure your MetaMask is on one of these networks

3. **Start Swapping:**
   - Select tokens you want to swap
   - Enter amount
   - View rates from different DEXs
   - Click "Swap Tokens" to execute

## Important Notes

### For Production Use:
- Add your 1inch API key in `src/services/dex.ts` and `src/services/swap.ts`
- Replace `YOUR_API_KEY` with your actual API key from [1inch Developer Portal](https://portal.1inch.dev/)

### For Testing:
- Use testnets (Goerli or Sepolia) to avoid spending real ETH
- Get test ETH from faucets:
  - Goerli: https://goerlifaucet.com/
  - Sepolia: https://sepoliafaucet.com/

### Troubleshooting:

**MetaMask not connecting:**
- Refresh the page
- Make sure MetaMask is unlocked
- Check browser console for errors

**Rates not loading:**
- Ensure you're on a supported network
- Check that token addresses are correct
- Verify you have internet connection

**Swap failing:**
- Check you have sufficient balance
- Verify gas fees are covered
- Ensure slippage tolerance is appropriate
- Check network congestion

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

