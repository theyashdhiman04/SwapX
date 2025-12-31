import { useState, useEffect } from "react";
import { Menu, X, Wallet, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";

const SwapNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isConnected, address, connect, disconnect, isConnecting, error, autoConnected } = useWallet();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  // Show toast when auto-connect succeeds
  useEffect(() => {
    if (autoConnected && isConnected) {
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to MetaMask",
      });
    }
  }, [autoConnected, isConnected, toast]);

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  const handleConnect = async () => {
    if (isConnected) {
      await disconnect();
    } else {
      try {
        await connect();
        toast({
          title: "Wallet Connected",
          description: "Successfully connected to MetaMask",
        });
      } catch (error: any) {
        let errorMessage = error.message || "Failed to connect wallet";
        
        // Provide mobile-specific instructions
        if (isMobile && errorMessage.includes("MetaMask")) {
          errorMessage = "Please open this site in MetaMask Mobile browser. Open MetaMask app → Browser → Enter swapx.yashdhiman.in";
        }
        
        toast({
          title: "Connection Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    }
  };

  const formatAddress = (addr: string | null) => {
    if (!addr) return "";
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return (
    <header className="fixed top-4 sm:top-5 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[92%] max-w-4xl">
      <nav className="glass-card rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 flex items-center justify-between">
        {/* Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5"
        >
          <Menu className="w-5 h-5" />
          <span className="text-sm font-medium hidden sm:inline">Menu</span>
        </button>

        {/* Logo */}
        <a href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 bg-primary rounded-lg sm:rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </div>
          <span className="font-display font-bold text-foreground text-lg sm:text-xl">SwapX</span>
        </a>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 text-muted-foreground hover:text-foreground"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
            className={`gap-1.5 sm:gap-2 font-medium text-xs sm:text-sm ${
              isConnected 
                ? 'bg-secondary text-foreground hover:bg-secondary/80' 
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">
              {isConnecting 
                ? "Connecting..." 
                : isConnected 
                  ? formatAddress(address) 
                  : "Connect"}
            </span>
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 sm:mt-3 glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <span className="font-display font-semibold text-sm sm:text-base text-foreground">Navigation</span>
              <button onClick={() => setIsMenuOpen(false)} className="text-muted-foreground hover:text-foreground p-1">
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            <div className="space-y-0.5 sm:space-y-1">
              <MenuSection title="Trading">
                <MenuItem href="#swap" label="Swap" />
                <MenuItem href="#swap" label="Limit Orders" badge="Soon" />
                <MenuItem href="#swap" label="Liquidity" badge="Soon" />
              </MenuSection>
              
              <MenuSection title="DEX Integrations">
                <MenuItem href="#dex" label="Uniswap V3" />
                <MenuItem href="#dex" label="SushiSwap" />
                <MenuItem href="#dex" label="1inch" />
              </MenuSection>
              
              <MenuSection title="Resources">
                <MenuItem href="#networks" label="Supported Networks" />
                <MenuItem href="#tokens" label="Token List" />
                <MenuItem href="https://github.com/theyashdhiman04/SwapX/blob/main/README.md" label="Documentation" />
              </MenuSection>
            </div>

            <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border flex flex-wrap gap-3 sm:gap-4 md:gap-6">
              <a 
                href="https://github.com/theyashdhiman04/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-xs sm:text-sm transition-colors"
              >
                GitHub
              </a>
              <a 
                href="https://x.com/theyashdhiman" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-xs sm:text-sm transition-colors"
              >
                Twitter
              </a>
              <a 
                href="https://www.linkedin.com/in/itsyashdhiman/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground text-xs sm:text-sm transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const MenuSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="py-3">
    <span className="text-muted-foreground text-xs uppercase tracking-wider mb-3 block font-medium">{title}</span>
    <div className="space-y-1">{children}</div>
  </div>
);

const MenuItem = ({ href, label, badge }: { href: string; label: string; badge?: string }) => {
  const isExternal = href.startsWith('http');
  return (
    <a 
      href={href} 
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="flex items-center gap-1.5 sm:gap-2 text-foreground hover:text-primary py-1.5 sm:py-2 transition-colors"
    >
      <span className="text-xs sm:text-sm font-medium">{label}</span>
      {badge && (
        <span className="text-[9px] sm:text-[10px] bg-primary/10 text-primary px-1.5 sm:px-2 py-0.5 rounded-full font-medium shrink-0">
          {badge}
        </span>
      )}
    </a>
  );
};

export default SwapNavbar;
