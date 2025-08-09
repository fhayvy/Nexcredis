'use client';

import React from 'react';
import { useWeb3 } from '@/hooks/use-web3';
import { Button } from '../ui/button';

const WalletConnect: React.FC = () => {
  const { isConnected, account, balance, connect, disconnect } = useWeb3();

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <div className="text-sm text-gray-600">
          <div>{account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connected'}</div>
          {balance !== null && <div className="text-xs">Balance: {balance.toFixed(2)} HBAR</div>}
        </div>
        <Button 
          onClick={disconnect}
          variant="outline"
          size="sm"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button 
      onClick={connect}
      className="bg-blue-600 hover:bg-blue-700 text-white"
    >
      Connect Wallet
    </Button>
  );
};

export default WalletConnect;
