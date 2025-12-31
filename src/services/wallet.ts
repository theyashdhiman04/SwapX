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

  async connect(): Promise<WalletState> {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error('MetaMask is not installed. Please install MetaMask to continue.');
    }

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Create provider
      this.provider = new ethers.BrowserProvider(window.ethereum);
      this.signer = await this.provider.getSigner();
      
      const address = await this.signer.getAddress();
      const network = await this.provider.getNetwork();
      const balance = await this.provider.getBalance(address);
      
      // Set up event listeners
      this.setupEventListeners();
      
      return {
        address,
        chainId: Number(network.chainId),
        isConnected: true,
        balance: ethers.formatEther(balance),
      };
    } catch (error: any) {
      if (error.code === 4001) {
        throw new Error('Please connect to MetaMask.');
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
    // Check if wallet is already connected
    if (typeof window === 'undefined' || !window.ethereum) {
      return null;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length === 0) {
        // No accounts connected
        this.provider = null;
        this.signer = null;
        return null;
      }

      // Wallet is connected, ensure provider is initialized
      if (!this.provider) {
        this.provider = new ethers.BrowserProvider(window.ethereum);
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
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', callback);
    }
  }

  onChainChanged(callback: (chainId: string) => void): void {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', callback);
    }
  }

  private setupEventListeners(): void {
    if (!window.ethereum) return;

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

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
  }

  private removeEventListeners(): void {
    if (!window.ethereum) return;
    window.ethereum.removeAllListeners('accountsChanged');
    window.ethereum.removeAllListeners('chainChanged');
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
    if (!window.ethereum) {
      throw new Error('MetaMask is not installed');
    }

    try {
      await window.ethereum.request({
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
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeAllListeners: (event: string) => void;
      isMetaMask?: boolean;
    };
  }
}

