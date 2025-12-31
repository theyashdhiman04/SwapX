import { Github, Twitter, Linkedin } from "lucide-react";

const SwapFooter = () => {
  return (
    <footer className="bg-card border-t border-border py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-swap-purple to-swap-blue rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 16V4M7 4L3 8M7 4l4 4M17 8v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <span className="font-display font-bold text-foreground text-lg">SwapX</span>
            </div>
            <span className="text-sm text-muted-foreground">© 2025 SwapX Protocol</span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6">
            <a 
              href="https://github.com/theyashdhiman04/SwapX/blob/main/README.md" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Documentation
            </a>
            <a 
              href="https://github.com/theyashdhiman04/SwapX/blob/main/README.md#security" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a 
              href="https://github.com/theyashdhiman04/SwapX/blob/main/README.md#license" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a 
              href="https://github.com/theyashdhiman04/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://x.com/theyashdhiman" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter/X"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/itsyashdhiman/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        {/* Bottom Note */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border text-center px-2">
          <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">
            Built with Ethers.js, Web3.js, and React. Integrates with Uniswap V3, SushiSwap, and 1inch APIs.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SwapFooter;