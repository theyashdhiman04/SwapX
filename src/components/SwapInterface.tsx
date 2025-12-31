import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowDownUp, ChevronDown, Settings, Info, Zap, TrendingUp, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useWallet } from "@/hooks/useWallet";
import { dexService, SwapRoute } from "@/services/dex";
import { swapService } from "@/services/swap";
import { getTokenInfo } from "@/config/tokens";
import { useToast } from "@/hooks/use-toast";

interface Token {
  symbol: string;
  name: string;
  balance: string;
  logo: React.ReactNode;
}

const tokens: Token[] = [
  { 
    symbol: "ETH", 
    name: "Ethereum", 
    balance: "0",
    logo: (
      <svg viewBox="0 0 32 32" className="w-full h-full fill-foreground">
        <path d="M16 0L6 16l10 6 10-6L16 0zm0 24l-10-6 10 14 10-14-10 6z"/>
      </svg>
    )
  },
  { 
    symbol: "USDC", 
    name: "USD Coin", 
    balance: "0",
    logo: (
      <svg viewBox="0 0 32 32" className="w-full h-full fill-foreground">
        <path d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm0 28c-6.6 0-12-5.4-12-12S9.4 4 16 4s12 5.4 12 12-5.4 12-12 12z"/>
        <path d="M17.4 18.8v2.4c2.4-.4 4.2-1.8 4.4-3.6h-2.2c-.2.8-.9 1.2-2.2 1.2zm-2.8-5.6V10.8c-2.4.4-4.2 1.8-4.4 3.6h2.2c.2-.8.9-1.2 2.2-1.2zm2.8 0c1.3 0 2 .4 2.2 1.2h2.2c-.2-1.8-2-3.2-4.4-3.6v2.4zm-2.8 5.6c-1.3 0-2-.4-2.2-1.2h-2.2c.2 1.8 2 3.2 4.4 3.6v-2.4z"/>
      </svg>
    )
  },
  { 
    symbol: "USDT", 
    name: "Tether", 
    balance: "0",
    logo: (
      <svg viewBox="0 0 32 32" className="w-full h-full fill-foreground">
        <path d="M17.9 17.2v-.1c-.1 0-1.1.1-3 .1-1.5 0-2.6 0-2.9-.1v.1c-5.7-.3-10-1.3-10-2.5 0-1.2 4.3-2.2 10-2.5v4c.4 0 1.4.1 3 .1 1.8 0 2.7-.1 2.9-.1v-4c5.7.3 9.9 1.3 9.9 2.5.1 1.2-4.2 2.2-9.9 2.5zm0-5.4V8h8.1V3H6v5h8.1v3.8c-6.5.3-11.4 1.6-11.4 3.3 0 1.7 4.9 3 11.4 3.3v12h3.8v-12c6.4-.3 11.3-1.6 11.3-3.3 0-1.6-4.9-3-11.3-3.3z"/>
      </svg>
    )
  },
  { 
    symbol: "DAI", 
    name: "Dai", 
    balance: "0",
    logo: (
      <svg viewBox="0 0 32 32" className="w-full h-full fill-foreground">
        <path d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm0 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16 9.4 4 16 4zm-5 8h3.5c2.5 0 4.5 2 4.5 4.5S17 21 14.5 21H11v-9zm2 2v5h1.5c1.4 0 2.5-1.1 2.5-2.5S15.9 14 14.5 14H13z"/>
      </svg>
    )
  },
  { 
    symbol: "WBTC", 
    name: "Wrapped Bitcoin", 
    balance: "0",
    logo: (
      <svg viewBox="0 0 32 32" className="w-full h-full fill-foreground">
        <path d="M16 0C7.2 0 0 7.2 0 16s7.2 16 16 16 16-7.2 16-16S24.8 0 16 0zm5.3 11.9c.4 1.7-.5 2.8-1.8 3.4 1.8.4 2.9 1.7 2.5 3.7-.5 2.5-2.6 3.2-5.6 3.1l-.6 2.5-1.5-.4.6-2.4-1.2-.3-.6 2.4-1.5-.4.6-2.5-3.1-.8.8-1.8s1.1.3 1.1.3c.4.1.6-.2.7-.4l1-4 .5-2c0-.3-.1-.7-.6-.8 0 0-1.1-.3-1.1-.3l.4-1.6 3.1.8.6-2.4 1.5.4-.6 2.3 1.2.3.6-2.3 1.5.4-.6 2.4c1.8.6 3.1 1.5 2.8 3.2zm-2.9 5.6c-.3-1.3-2.4-1.1-3.3-.9l-.7 2.8c.9.2 4.3.7 4-1.9zm.4-4c-.3-1.2-2-.9-2.8-.8l-.6 2.5c.8.2 3.7.6 3.4-1.7z"/>
      </svg>
    )
  },
];

const SwapInterface = () => {
  const { isConnected, address, chainId, connect } = useWallet();
  const { toast } = useToast();
  
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState("1.0");
  const [showFromTokens, setShowFromTokens] = useState(false);
  const [showToTokens, setShowToTokens] = useState(false);
  const [slippage, setSlippage] = useState("0.5");
  const [showSettings, setShowSettings] = useState(false);
  
  const [routes, setRoutes] = useState<SwapRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<SwapRoute | null>(null);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [toAmount, setToAmount] = useState("0");
  const [quoteError, setQuoteError] = useState<string | null>(null);

  // Fetch quotes when tokens or amount change
  useEffect(() => {
    if (!isConnected || !chainId) {
      setRoutes([]);
      setSelectedRoute(null);
      setToAmount("0");
      setQuoteError(null);
      return;
    }

    if (!fromAmount || parseFloat(fromAmount) <= 0 || isNaN(parseFloat(fromAmount))) {
      setRoutes([]);
      setSelectedRoute(null);
      setToAmount("0");
      setQuoteError(null);
      setIsLoadingQuotes(false);
      return;
    }

    const fetchQuotes = async () => {
      setIsLoadingQuotes(true);
      setQuoteError(null);
      try {
        // Validate network
        const supportedNetworks = [1, 5, 11155111]; // Mainnet, Goerli, Sepolia
        if (!supportedNetworks.includes(chainId)) {
          throw new Error(`Unsupported network. Please switch to Ethereum Mainnet, Goerli, or Sepolia. Current: ${chainId}`);
        }

        console.log('Fetching quotes:', {
          chainId,
          fromToken: fromToken.symbol,
          toToken: toToken.symbol,
          amount: fromAmount,
        });

        const quotes = await dexService.getQuotes(
          chainId,
          fromToken.symbol,
          toToken.symbol,
          fromAmount
        );
        
        console.log('Quotes received:', quotes);

        if (quotes.length === 0) {
          console.error('No quotes returned from DEX service');
          throw new Error('No quotes available. Please check:\n- Browser console (F12) for details\n- Network connection\n- Token pair liquidity\n- Try refreshing the page');
        }

        setRoutes(quotes);
        const bestRoute = quotes.find(r => r.isBest) || quotes[0];
        setSelectedRoute(bestRoute);
        setToAmount(bestRoute.quote.amountOutFormatted);
        setQuoteError(null);
      } catch (error: any) {
        console.error('Error fetching quotes:', error);
        console.error('Error stack:', error.stack);
        console.error('Error details:', {
          message: error.message,
          name: error.name,
          chainId,
          fromToken: fromToken.symbol,
          toToken: toToken.symbol,
          amount: fromAmount,
        });
        
        const errorMessage = error.message || "Failed to fetch swap quotes";
        setQuoteError(errorMessage);
        setRoutes([]);
        setSelectedRoute(null);
        setToAmount("0");
        
        // Show toast for all errors so user knows what's wrong
        toast({
          title: "Quote Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoadingQuotes(false);
      }
    };

    const debounceTimer = setTimeout(fetchQuotes, 500);
    return () => clearTimeout(debounceTimer);
  }, [fromToken, toToken, fromAmount, chainId, isConnected, toast]);

  // Update token balances when wallet connects
  useEffect(() => {
    if (isConnected && address && chainId) {
      console.log('Wallet connected:', { address, chainId });
      // In a real app, you'd fetch actual token balances here
      // For now, we'll keep the placeholder balances
    }
  }, [isConnected, address, chainId]);

  // Debug info display (can be removed in production)
  useEffect(() => {
    console.log('SwapInterface state:', {
      isConnected,
      chainId,
      fromToken: fromToken.symbol,
      toToken: toToken.symbol,
      fromAmount,
      routesCount: routes.length,
      selectedRoute: selectedRoute?.name,
      toAmount,
      isLoadingQuotes,
      quoteError,
    });
  }, [isConnected, chainId, fromToken, toToken, fromAmount, routes, selectedRoute, toAmount, isLoadingQuotes, quoteError]);

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setRoutes([]);
    setSelectedRoute(null);
    setToAmount("0");
  };

  const handleSwap = async () => {
    if (!isConnected) {
      try {
        await connect();
        return;
      } catch (error: any) {
        toast({
          title: "Connection Failed",
          description: error.message || "Please connect your wallet",
          variant: "destructive",
        });
        return;
      }
    }

    if (!selectedRoute || !chainId) {
      toast({
        title: "Error",
        description: "Please select a swap route",
        variant: "destructive",
      });
      return;
    }

    setIsSwapping(true);
    try {
      const result = await swapService.executeSwapWithFallback(
        {
          route: selectedRoute,
          tokenInSymbol: fromToken.symbol,
          tokenOutSymbol: toToken.symbol,
          amountIn: fromAmount,
          slippageTolerance: parseFloat(slippage),
        },
        routes
      );

      toast({
        title: "Swap Successful",
        description: `Transaction: ${result.hash}`,
      });
    } catch (error: any) {
      console.error('Swap error:', error);
      
      // Parse error message to extract user-friendly message
      let errorMessage = "Transaction failed. Please try again.";
      
      if (error?.message) {
        const message = error.message;
        
        // Extract common error patterns
        if (message.includes("insufficient funds")) {
          errorMessage = "Insufficient funds. Please ensure you have enough balance for the swap and gas fees.";
        } else if (message.includes("user rejected") || message.includes("User denied")) {
          errorMessage = "Transaction was cancelled.";
        } else if (message.includes("slippage")) {
          errorMessage = "Price moved too much. Try increasing slippage tolerance or try again.";
        } else if (message.includes("gas")) {
          errorMessage = "Gas estimation failed. Please try again or increase gas limit.";
        } else if (message.includes("network")) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else if (message.includes("Swap failed:")) {
          // Extract the part after "Swap failed:"
          const parts = message.split("Swap failed:");
          if (parts.length > 1) {
            const cleanMessage = parts[1].trim();
            // Remove raw transaction data (hex strings, JSON objects)
            const cleaned = cleanMessage
              .replace(/\{[\s\S]*?"data":[\s\S]*?\}/g, '') // Remove JSON objects with data field
              .replace(/0x[a-fA-F0-9]{40,}/g, '') // Remove long hex strings
              .replace(/transaction=[\s\S]*/gi, '') // Remove transaction= parts
              .trim();
            
            if (cleaned && cleaned.length > 0 && cleaned.length < 200) {
              errorMessage = cleaned;
            }
          }
        } else if (message.length < 200 && !message.includes("0x") && !message.includes("{")) {
          // Use message if it's short and doesn't contain raw data
          errorMessage = message;
        }
      }
      
      toast({
        title: "Swap Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSwapping(false);
    }
  };

  const formatRate = (rate: string) => {
    const num = parseFloat(rate);
    if (num >= 1000) {
      return num.toLocaleString('en-US', { maximumFractionDigits: 2 });
    }
    if (num < 0.0001) {
      // For very small numbers, show more precision
      return num.toFixed(6);
    }
    return num.toFixed(4);
  };

  return (
    <section id="swap" className="min-h-screen pt-20 sm:pt-24 pb-8 px-4 sm:px-6 relative flex flex-col justify-center">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 sm:mb-5 md:mb-6"
        >
          <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-display-md font-bold text-foreground mb-2 sm:mb-2 px-2 sm:px-0 leading-[1.1] sm:leading-tight">
            <span className="block sm:inline">Swap tokens across </span>
            <br className="block sm:hidden -mt-3" />
            <span className="gradient-text block sm:inline -mt-2 sm:mt-0">different chains</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground px-2 sm:px-0 mt-2 sm:mt-0">
            Fast, secure, and always on the best route.
          </p>
        </motion.div>

        {/* Swap Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-card relative overflow-hidden mt-3 sm:mt-0"
        >
          {/* Settings Row */}
          <div className="flex items-center justify-between mb-2.5 sm:mb-3 md:mb-4">
            <span className="font-display font-semibold text-base sm:text-lg text-foreground">Swap</span>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="flex items-center gap-1 bg-secondary rounded-lg px-2 sm:px-2.5 py-1 sm:py-1.5">
                <span className="text-[10px] sm:text-xs text-muted-foreground hidden xs:inline">Slippage:</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground xs:hidden">Slip:</span>
                <input
                  type="text"
                  value={slippage}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0 && parseFloat(value) <= 50)) {
                      setSlippage(value);
                    }
                  }}
                  className="w-7 sm:w-8 text-[10px] sm:text-xs font-semibold bg-transparent text-foreground text-center focus:outline-none"
                  placeholder="0.5"
                />
                <span className="text-[10px] sm:text-xs text-muted-foreground">%</span>
              </div>
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Swap Settings</DialogTitle>
                    <DialogDescription>
                      Configure your swap preferences. Changes will be applied immediately.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="slippage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Slippage Tolerance
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          id="slippage"
                          type="number"
                          min="0.1"
                          max="50"
                          step="0.1"
                          value={slippage}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0 && parseFloat(value) <= 50)) {
                              setSlippage(value);
                            }
                          }}
                          className="flex-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="0.5"
                        />
                        <span className="text-sm text-muted-foreground">%</span>
                      </div>
                      <div className="flex gap-2 mt-2">
                        {["0.1", "0.5", "1.0", "3.0"].map((preset) => (
                          <button
                            key={preset}
                            onClick={() => setSlippage(preset)}
                            className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                              slippage === preset
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-secondary text-foreground border-border hover:bg-secondary/80"
                            }`}
                          >
                            {preset}%
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your transaction will revert if the price changes unfavorably by more than this percentage.
                      </p>
                    </div>
                    <div className="grid gap-2 pt-2 border-t">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Transaction Deadline</p>
                          <p className="text-xs text-muted-foreground">Default: 20 minutes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* From Token */}
          <div className="relative">
            <TokenInput
              label="You send"
              token={fromToken}
              amount={fromAmount}
              onAmountChange={setFromAmount}
              onTokenClick={() => setShowFromTokens(!showFromTokens)}
              showDropdown={showFromTokens}
              tokens={tokens.filter(t => t.symbol !== toToken.symbol)}
              onSelectToken={(t) => { setFromToken(t); setShowFromTokens(false); }}
            />
          </div>

          {/* Swap Button */}
          <div className="flex justify-center -my-1 sm:-my-1.5 md:-my-2 relative z-10">
            <button
              onClick={handleSwapTokens}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-secondary border-4 border-card rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200 group shrink-0"
            >
              <ArrowDownUp className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-muted-foreground group-hover:text-primary-foreground" />
            </button>
          </div>

          {/* To Token */}
          <div className="relative">
            <TokenInput
              label="You receive"
              token={toToken}
              amount={
                isLoadingQuotes 
                  ? "..." 
                  : quoteError 
                    ? "0" 
                    : toAmount || "0"
              }
              onAmountChange={() => {}}
              onTokenClick={() => setShowToTokens(!showToTokens)}
              showDropdown={showToTokens}
              tokens={tokens.filter(t => t.symbol !== fromToken.symbol)}
              onSelectToken={(t) => { setToToken(t); setShowToTokens(false); }}
              readOnly
            />
          </div>

          {/* Loading Quotes */}
          {isLoadingQuotes && (
            <div className="mt-4 p-3 bg-secondary/50 rounded-xl flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Fetching best rates...</span>
            </div>
          )}

          {/* Error Message */}
          {quoteError && !isLoadingQuotes && isConnected && (
            <div className="mt-2.5 sm:mt-3 p-2.5 sm:p-3 bg-destructive/10 border border-destructive/20 rounded-lg sm:rounded-xl">
              <div className="flex items-start gap-2 text-destructive text-xs sm:text-sm">
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold mb-1 text-xs sm:text-sm">Unable to Get Conversion Rate</div>
                  <div className="whitespace-pre-line text-[10px] sm:text-xs break-words">{quoteError}</div>
                </div>
              </div>
              <div className="mt-2 text-[10px] sm:text-xs text-muted-foreground bg-background/50 p-1.5 sm:p-2 rounded">
                <strong>Tips:</strong>
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  <li>Check browser console (F12) for detailed logs</li>
                  <li>Ensure you're on Ethereum Mainnet, Goerli, or Sepolia</li>
                  <li>Try a larger amount (minimum 0.01 ETH recommended)</li>
                  <li>Check your internet connection</li>
                </ul>
              </div>
            </div>
          )}

          {/* No Conversion Available Message */}
          {!isLoadingQuotes && !quoteError && isConnected && fromAmount && parseFloat(fromAmount) > 0 && (!toAmount || toAmount === "0") && (
            <div className="mt-2.5 sm:mt-3 p-2 sm:p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg sm:rounded-xl">
              <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 text-xs sm:text-sm">
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="break-words">Conversion rate not available. Please check console for details or try again.</span>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoadingQuotes && isConnected && (
            <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-secondary/50 rounded-lg sm:rounded-xl">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-primary" />
                <span className="text-muted-foreground">Fetching quotes from DEXs...</span>
              </div>
            </div>
          )}

          {/* Debug Info (only in development) */}
          {process.env.NODE_ENV === 'development' && isConnected && (
            <div className="mt-2 p-2 bg-secondary/30 rounded-lg text-xs text-muted-foreground">
              <div>Chain ID: {chainId || 'Not set'}</div>
              <div>Address: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}</div>
              <div>Routes: {routes.length}</div>
              <div>Loading: {isLoadingQuotes ? 'Yes' : 'No'}</div>
            </div>
          )}

          {/* Network Warning */}
          {isConnected && chainId && ![1, 5, 11155111].includes(chainId) && (
            <div className="mt-2.5 sm:mt-3 p-2 sm:p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-lg sm:rounded-xl">
              <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 text-xs sm:text-sm">
                <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span className="break-words">Unsupported network. Please switch to Ethereum Mainnet, Goerli, or Sepolia.</span>
              </div>
            </div>
          )}

          {/* Best Route */}
          {selectedRoute && !isLoadingQuotes && !quoteError && (
            <>
              <div className="mt-2.5 sm:mt-3 p-2 sm:p-2.5 bg-primary/5 border border-primary/20 rounded-lg sm:rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-foreground">
                    Best Route: {selectedRoute.name}
                  </span>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <span className="text-xs sm:text-sm font-semibold text-primary break-words">
                    {formatRate(selectedRoute.quote.amountOutFormatted)} {toToken.symbol}
                  </span>
                </div>
              </div>

              {/* Swap Details */}
              <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-0 text-[10px] sm:text-xs text-muted-foreground">
                <span className="flex items-center gap-1 break-words">
                  Rate: 1 {fromToken.symbol} = {(() => {
                    // Calculate actual rate: output amount / input amount
                    const inputAmount = parseFloat(fromAmount || "0");
                    const outputAmount = parseFloat(selectedRoute.quote.amountOutFormatted || "0");
                    if (inputAmount > 0 && outputAmount > 0) {
                      const rate = outputAmount / inputAmount;
                      return formatRate(rate.toString());
                    }
                    return "0";
                  })()} {toToken.symbol}
                </span>
                <span className="shrink-0">Fee: {selectedRoute.quote.gasEstimate}</span>
              </div>

              {/* Alternative Routes */}
              {routes.length > 1 && (
                <div className="mt-2 p-2 bg-secondary/30 rounded-lg">
                  <div className="text-[10px] sm:text-xs text-muted-foreground mb-1 sm:mb-1.5">Other routes:</div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {routes.filter(r => !r.isBest).map((route) => (
                      <button
                        key={route.name}
                        onClick={() => {
                          setSelectedRoute(route);
                          setToAmount(route.quote.amountOutFormatted);
                        }}
                        className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 sm:py-1.5 bg-card border border-border rounded-md hover:border-primary/50 transition-colors break-words"
                      >
                        {route.name}: {formatRate(route.quote.amountOutFormatted)} {toToken.symbol}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Swap Button */}
          <Button 
            onClick={handleSwap}
            disabled={!isConnected || !selectedRoute || isLoadingQuotes || isSwapping || !!quoteError || parseFloat(toAmount) === 0}
            className="w-full mt-2.5 sm:mt-3 h-11 sm:h-12 text-sm sm:text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 btn-glow rounded-lg sm:rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSwapping ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Swapping...
              </>
            ) : !isConnected ? (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Connect Wallet
              </>
            ) : isLoadingQuotes ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Loading Quotes...
              </>
            ) : !selectedRoute || parseFloat(toAmount) === 0 ? (
              <>
                <Zap className="w-5 h-5 mr-2" />
                {quoteError ? "Quote Error" : "Enter Amount"}
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                Swap Tokens
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

interface TokenInputProps {
  label: string;
  token: Token;
  amount: string;
  onAmountChange: (value: string) => void;
  onTokenClick: () => void;
  showDropdown: boolean;
  tokens: Token[];
  onSelectToken: (token: Token) => void;
  readOnly?: boolean;
}

const TokenInput = ({
  label,
  token,
  amount,
  onAmountChange,
  onTokenClick,
  showDropdown,
  tokens,
  onSelectToken,
  readOnly = false,
}: TokenInputProps) => (
  <div className="bg-secondary/50 rounded-lg sm:rounded-xl p-2.5 sm:p-3 relative">
    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
      <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">{label}</span>
      <span className="text-[10px] sm:text-xs text-muted-foreground">Balance: {token.balance}</span>
    </div>
    <div className="flex items-center gap-2 sm:gap-3">
      <input
        type="text"
        value={amount}
        onChange={(e) => {
          const value = e.target.value;
          if (value === '' || /^\d*\.?\d*$/.test(value)) {
            onAmountChange(value);
          }
        }}
        readOnly={readOnly}
        className={`flex-1 text-lg sm:text-xl md:text-2xl font-semibold bg-transparent text-foreground focus:outline-none ${readOnly ? 'cursor-default' : ''}`}
        placeholder="0.0"
      />
      <button
        onClick={onTokenClick}
        className="flex items-center gap-1.5 sm:gap-2 bg-card border border-border rounded-lg px-2 sm:px-2.5 py-1.5 sm:py-2 hover:border-primary/50 transition-colors shrink-0"
      >
        <div className="w-4 h-4 sm:w-5 sm:h-5">
          {token.logo}
        </div>
        <span className="font-semibold text-foreground text-xs sm:text-sm">{token.symbol}</span>
        <ChevronDown className="w-3 h-3 text-muted-foreground hidden sm:block" />
      </button>
    </div>
    <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">≈$0</div>
    
    {/* Token Dropdown */}
    {showDropdown && (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl p-2 shadow-premium-lg z-20 max-h-64 overflow-y-auto"
      >
        {tokens.map((t) => (
          <button
            key={t.symbol}
            onClick={() => onSelectToken(t)}
            className="w-full flex items-center gap-3 p-3 hover:bg-secondary rounded-xl transition-colors"
          >
            <div className="w-8 h-8">
              {t.logo}
            </div>
            <div className="text-left flex-1">
              <div className="font-semibold text-foreground">{t.symbol}</div>
              <div className="text-xs text-muted-foreground">{t.name}</div>
            </div>
            <span className="text-sm text-muted-foreground font-medium">{t.balance}</span>
          </button>
        ))}
      </motion.div>
    )}
  </div>
);

export default SwapInterface;
