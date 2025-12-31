import { ethers } from 'ethers';

export interface WalletState {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  balance: string;
}

export class WalletService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private listeners: Array<() => void> = [];
  private pendingConnection: boolean = false;
  private readonly REDIRECT_FLAG = 'metamask_redirect_pending';

  private isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

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

  private async openMetaMaskMobile(): Promise<void> {
    if (this.isMobile()) {
      // Mark that we're expecting a redirect
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.setItem(this.REDIRECT_FLAG, 'true');
      }
      
      // Use just the origin (simplest possible URL to avoid white page issues)
      // MetaMask deep links work best with simple URLs
      const origin = window.location.origin;
      
      // Encode only the origin (no query params to avoid encoding issues)
      const encodedUrl = encodeURIComponent(origin);
      
      // Construct MetaMask deep link
      // Format: https://metamask.app.link/dapp/[encoded-url]
      const metamaskUrl = `https://metamask.app.link/dapp/${encodedUrl}`;
      
      // For mobile, redirect to MetaMask app
      // MetaMask will open this URL in its browser
      try {
        // Small delay to ensure current page state is saved
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Use replace to avoid back button issues and ensure clean navigation
        window.location.replace(metamaskUrl);
      } catch (error) {
        console.error('Failed to redirect to MetaMask:', error);
        // Fallback: use href if replace fails
        try {
          window.location.href = metamaskUrl;
        } catch (fallbackError) {
          console.error('Fallback redirect also failed:', fallbackError);
          // Last resort: try opening in new window
          window.open(metamaskUrl, '_blank');
        }
      }
    }
  }

  // Check if we're returning from a MetaMask redirect and auto-connect
  async checkAndAutoConnect(): Promise<WalletState | null> {
    if (typeof window === 'undefined') {
      return null;
    }

    // Check URL parameters for MetaMask redirect indicator
    const urlParams = new URLSearchParams(window.location.search);
    const isFromMetaMaskParam = urlParams.get('metamask') === 'true';
    
    // Check sessionStorage for redirect flag
    const isRedirectPending = window.sessionStorage?.getItem(this.REDIRECT_FLAG);
    
    // Check referrer for MetaMask link
    const referrer = document.referrer.toLowerCase();
    const isFromMetaMaskLink = referrer.includes('metamask.app.link');
    
    // Check if we're in MetaMask browser
    const isInMetaMaskBrowser = this.isInMetaMaskBrowser();
    
    // Only auto-connect if we have a clear indicator
    if (!isFromMetaMaskParam && !isRedirectPending && !isFromMetaMaskLink && !isInMetaMaskBrowser) {
      return null;
    }

    // Clear the flag after checking
    if (window.sessionStorage && isRedirectPending) {
      window.sessionStorage.removeItem(this.REDIRECT_FLAG);
    }

    // Poll for MetaMask availability (it may take a moment to inject)
    const maxAttempts = 15; // Increased attempts for slower devices
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const ethereum = this.getEthereumProvider();
      if (ethereum) {
        try {
          // Auto-connect
          return await this.connectWithProvider(ethereum);
        } catch (error: any) {
          console.error('Auto-connect failed:', error);
          // If user rejected, don't retry
          if (error.code === 4001) {
            return null;
          }
          // Continue polling for other errors
        }
      }
    }

    return null;
  }

  // Check if we're in MetaMask's mobile browser
  private isInMetaMaskBrowser(): boolean {
    if (typeof window === 'undefined') return false;
    
    const userAgent = navigator.userAgent.toLowerCase();
    // MetaMask mobile browser indicators
    const hasMetaMaskUA = userAgent.includes('metamask') || userAgent.includes('trust');
    const hasMetaMaskProvider = window.ethereum?.isMetaMask === true;
    
    // Also check document.referrer for MetaMask redirects
    const referrer = document.referrer.toLowerCase();
    const fromMetaMaskLink = referrer.includes('metamask.app.link');
    
    return hasMetaMaskUA || hasMetaMaskProvider || fromMetaMaskLink;
  }

  async connect(): Promise<WalletState> {
    const ethereum = this.getEthereumProvider();
    
    if (!ethereum) {
      if (this.isMobile()) {
        // Check if we're already in MetaMask browser (check for MetaMask indicators)
        const isInMetaMaskBrowser = this.isInMetaMaskBrowser();
        
        if (isInMetaMaskBrowser) {
          // We're in MetaMask browser but provider not injected yet - wait a bit
          await new Promise(resolve => setTimeout(resolve, 1000));
          const ethereumAfterWait = this.getEthereumProvider();
          if (ethereumAfterWait) {
            return this.connectWithProvider(ethereumAfterWait);
          }
        }
        
        // Mark that we're attempting a connection
        this.pendingConnection = true;
        
        // Try to open MetaMask Mobile
        await this.openMetaMaskMobile();
        
        // Don't throw immediately - wait a bit to see if MetaMask injects
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Check again after delay
        const ethereumAfterDelay = this.getEthereumProvider();
        if (!ethereumAfterDelay) {
          this.pendingConnection = false;
          throw new Error(
            'MetaMask Mobile not detected. Please open this site in MetaMask Mobile browser. Open MetaMask app → Browser → Enter the site URL.'
          );
        }
        
        // MetaMask is now available, continue with connection
        return this.connectWithProvider(ethereumAfterDelay);
      }
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    return this.connectWithProvider(ethereum);
  }

  private async connectWithProvider(ethereum: any): Promise<WalletState> {
    try {
      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask.');
      }
      
      // Create provider
      this.provider = new ethers.BrowserProvider(ethereum);
      this.signer = await this.provider.getSigner();
      
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();
      const balance = await this.provider.getBalance(address);
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Clear pending connection flag
      this.pendingConnection = false;
      if (typeof window !== 'undefined' && window.sessionStorage) {
        window.sessionStorage.removeItem(this.REDIRECT_FLAG);
      }
      
      return {
        address,
        chainId: Number(network.chainId),
        isConnected: true,
        balance: ethers.formatEther(balance),
      };
    } catch (error: any) {
      this.pendingConnection = false;
      if (error.code === 4001) {
        throw new Error('Connection rejected. Please approve the connection request in MetaMask.');
      }
      if (error.code === -32002) {
        throw new Error('Connection request already pending. Please check MetaMask.');
      }
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    this.provider = null;
    this.signer = null;
    this.removeEventListeners();
    this.notifyListeners();
  }

  async getState(): Promise<WalletState | null> {
    const ethereum = this.getEthereumProvider();
    
    // Check if wallet is already connected
    if (!ethereum) {
      return null;
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length === 0) {
        // No accounts connected
        this.provider = null;
        this.signer = null;
        return null;
      }

      // Wallet is connected, ensure provider is initialized
      if (!this.provider) {
        this.provider = new ethers.BrowserProvider(ethereum);
        this.signer = await this.provider.getSigner();
        this.setupEventListeners();
      } else {
        // Provider exists, but signer might be stale - refresh it
        try {
          // Verify signer is still valid by getting address
          await this.signer.getAddress();
        } catch {
          // Signer is stale, recreate it
          this.signer = await this.provider.getSigner();
        }
      }

      // Get current state
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();
      const balance = await this.provider.getBalance(address);
      
      return {
        address,
        chainId: Number(network.chainId),
        isConnected: true,
        balance: ethers.formatEther(balance),
      };
    } catch (error) {
      console.error('Error checking wallet state:', error);
      // Reset provider/signer on error
      this.provider = null;
      this.signer = null;
      return null;
    }
  }

  getProvider(): ethers.BrowserProvider | null {
    return this.provider;
  }

  getSigner(): ethers.JsonRpcSigner | null {
    return this.signer;
  }

  onAccountsChanged(callback: (accounts: string[]) => void): void {
    const ethereum = this.getEthereumProvider();
    if (ethereum && ethereum.on) {
      ethereum.on('accountsChanged', callback);
    }
  }

  onChainChanged(callback: (chainId: string) => void): void {
    const ethereum = this.getEthereumProvider();
    if (ethereum && ethereum.on) {
      ethereum.on('chainChanged', callback);
    }
  }

  private setupEventListeners(): void {
    const ethereum = this.getEthereumProvider();
    if (!ethereum || !ethereum.on) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        this.disconnect();
      } else {
        this.notifyListeners();
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    ethereum.on('accountsChanged', handleAccountsChanged);
    ethereum.on('chainChanged', handleChainChanged);
  }

  private removeEventListeners(): void {
    const ethereum = this.getEthereumProvider();
    if (!ethereum || !ethereum.removeAllListeners) return;
    ethereum.removeAllListeners('accountsChanged');
    ethereum.removeAllListeners('chainChanged');
  }

  subscribe(callback: () => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  async switchNetwork(chainId: number): Promise<void> {
    const ethereum = this.getEthereumProvider();
    if (!ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        throw new Error(`Network with chainId ${chainId} is not added to MetaMask`);
      }
      throw error;
    }
  }
}

// Singleton instance
export const walletService = new WalletService();

// Extend Window interface for TypeScript
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on?: (event: string, callback: (...args: any[]) => void) => void;
      removeAllListeners?: (event: string) => void;
      isMetaMask?: boolean;
    };
    web3?: {
      currentProvider?: any;
    };
  }
}

