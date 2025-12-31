# Troubleshooting Guide

## Wallet Connected But Quotes Not Loading

If your wallet is connected (address shows in navbar) but quotes aren't loading, check the following:

### 1. Check Network
- Open browser console (F12)
- Look for network-related errors
- Ensure you're on Ethereum Mainnet (Chain ID: 1), Goerli (5), or Sepolia (11155111)
- If on wrong network, switch in MetaMask

### 2. Check Console Logs
The app logs helpful information:
- `Fetching quotes:` - Shows what's being requested
- `Quotes received:` - Shows what was returned
- Any error messages will help identify the issue

### 3. Common Issues

#### Issue: "Token not found"
**Solution:** The token might not be configured for your network. Check `src/config/tokens.ts` and ensure the token exists for your chainId.

#### Issue: "No quotes available"
**Possible causes:**
- No liquidity pool exists for this token pair
- Network congestion
- Token addresses incorrect

**Solution:**
- Try different token pairs
- Check if pools exist on Uniswap
- Verify you're on the correct network

#### Issue: "Unsupported network"
**Solution:** Switch to Ethereum Mainnet, Goerli, or Sepolia in MetaMask.

### 4. Debugging Steps

1. **Open Browser Console** (F12)
2. **Check Wallet Connection:**
   ```javascript
   // In console, check if wallet is detected
   typeof window.ethereum !== 'undefined'
   ```
3. **Check Current Network:**
   - Look at MetaMask extension
   - Or check console logs for chainId
4. **Verify Token Addresses:**
   - Check `src/config/tokens.ts`
   - Ensure addresses match your network

### 5. Manual Testing

Try these steps:
1. Disconnect wallet
2. Refresh page
3. Reconnect wallet
4. Enter a small amount (e.g., 0.001 ETH)
5. Check console for errors

### 6. Network-Specific Issues

#### Ethereum Mainnet
- Requires real ETH for gas
- All major tokens supported
- Higher gas fees

#### Goerli/Sepolia Testnets
- Use test ETH from faucets
- Limited token support
- Lower gas fees

### 7. Still Not Working?

Check:
- [ ] MetaMask is unlocked
- [ ] Correct network selected
- [ ] Token addresses are correct
- [ ] Browser console for errors
- [ ] Network tab for failed requests

## Button States

- **"Connect Wallet"** - Wallet not connected
- **"Enter Amount"** - Wallet connected but no quotes loaded
- **"Swap Tokens"** - Ready to swap (quotes loaded)
- **"Swapping..."** - Transaction in progress

## Getting Help

If issues persist:
1. Check browser console for full error messages
2. Verify network and token configuration
3. Try with different token pairs
4. Ensure sufficient balance for gas fees

