'use client';

import React, { createContext, useContext, useState } from 'react';

interface Web3ContextType {
  isConnected: boolean;
  account: string | null;
  balance: number | null;
  connect: () => void;
  disconnect: () => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const connect = () => {
    // Placeholder for Web3 connection logic
    setIsConnected(true);
    setAccount('0x1234567890abcdef1234567890abcdef12345678');
    setBalance(1.234567); // Mock balance as number
  };

  const disconnect = () => {
    setIsConnected(false);
    setAccount(null);
    setBalance(null);
  };

  return (
    <Web3Context.Provider value={{ isConnected, account, balance, connect, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

export { Web3Context };
