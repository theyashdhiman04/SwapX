import { useState, useEffect, useCallback } from 'react';
import { walletService, WalletState } from '@/services/wallet';

export const useWallet = () => {
  const [state, setState] = useState<WalletState>({
    address: null,
    chainId: null,
    isConnected: false,
    balance: '0',
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [autoConnected, setAutoConnected] = useState(false);

  const updateState = useCallback(async () => {
    try {
      const walletState = await walletService.getState();
      if (walletState) {
        setState(walletState);
      } else {
        setState({
          address: null,
          chainId: null,
          isConnected: false,
          balance: '0',
        });
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to get wallet state');
    }
  }, []);

  useEffect(() => {
    // Initial state check with a small delay to ensure MetaMask is ready
    const checkWallet = async () => {
      // Wait a bit for MetaMask to be ready
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Check if we're returning from a MetaMask mobile redirect and auto-connect
      try {
        const autoConnectedState = await walletService.checkAndAutoConnect();
        if (autoConnectedState) {
          setState(autoConnectedState);
          setIsConnecting(false);
          setError(null);
          setAutoConnected(true);
          // Clear the flag after a short delay
          setTimeout(() => setAutoConnected(false), 100);
          return;
        }
      } catch (err: any) {
        console.error('Auto-connect check failed:', err);
      }
      
      await updateState();
    };
    
    checkWallet();

    // Subscribe to wallet changes
    const unsubscribe = walletService.subscribe(() => {
      updateState();
    });

    // Listen for account changes
    walletService.onAccountsChanged(() => {
      updateState();
    });

    // Listen for chain changes
    walletService.onChainChanged(() => {
      updateState();
    });

    return () => {
      unsubscribe();
    };
  }, [updateState]);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const walletState = await walletService.connect();
      setState(walletState);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      await walletService.disconnect();
      setState({
        address: null,
        chainId: null,
        isConnected: false,
        balance: '0',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to disconnect wallet');
    }
  }, []);

  const switchNetwork = useCallback(async (chainId: number) => {
    try {
      await walletService.switchNetwork(chainId);
      await updateState();
    } catch (err: any) {
      setError(err.message || 'Failed to switch network');
      throw err;
    }
  }, [updateState]);

  return {
    ...state,
    isConnecting,
    error,
    autoConnected,
    connect,
    disconnect,
    switchNetwork,
    refresh: updateState,
  };
};

