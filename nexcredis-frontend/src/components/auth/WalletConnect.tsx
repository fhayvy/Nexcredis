'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { WalletIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useWeb3 } from '../../hooks/useWeb3'
import { useAuth } from '../../hooks/useAuth'
import { useNotifications } from '../../contexts/NotificationContext'

const walletOptions = [
  {
    name: 'MetaMask',
    icon: '🦊',
    description: 'Connect using MetaMask wallet',
    connector: 'metamask',
  },
  {
    name: 'HashPack',
    icon: '📦',
    description: 'Native Hedera wallet',
    connector: 'hashpack',
  },
  {
    name: 'WalletConnect',
    icon: '🔗',
    description: 'Connect with WalletConnect',
    connector: 'walletconnect',
  },
]

export default function WalletConnect() {
  const [isOpen, setIsOpen] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  
  const { connect, account, isConnected } = useWeb3()
  const { connectWallet } = useAuth()
  const { showToast } = useNotifications()

  const handleConnect = async (connector: string) => {
    setIsConnecting(true)
    
    try {
      await connect()
      if (account) {
        await connectWallet(account)
        showToast('Wallet connected successfully!', 'success')
        setIsOpen(false)
      }
    } catch (error: any) {
      showToast(error.message || 'Failed to connect wallet', 'error')
    } finally {
      setIsConnecting(false)
    }
  }

  if (isConnected && account) {
    return (
      <div className="flex items-center space-x-2 bg-hedera/10 border border-hedera/20 rounded-xl px-3 py-2">
        <WalletIcon className="w-4 h-4 text-hedera" />
        <span className="text-sm font-medium text-hedera">
          {account.slice(0, 6)}...{account.slice(-4)}
        </span>
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 bg-primary hover:bg-primary-hover text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-primary/30 active:scale-95"
      >
        <WalletIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Connect Wallet</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-neutral-slate border border-neutral-silver/20 rounded-2xl shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-neutral-silver/20">
                <h3 className="text-xl font-semibold text-neutral-white">
                  Connect Wallet
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-neutral-silver hover:text-neutral-white transition-colors duration-200"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-neutral-silver text-sm mb-6">
                  Connect your wallet to access all features of the Nexcredis platform.
                </p>

                {walletOptions.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => handleConnect(wallet.connector)}
                    disabled={isConnecting}
                    className="w-full flex items-center space-x-4 p-4 bg-neutral-charcoal/50 hover:bg-neutral-charcoal border border-neutral-silver/20 rounded-xl transition-all duration-200 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    <div className="text-2xl">{wallet.icon}</div>
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold text-neutral-white group-hover:text-primary transition-colors duration-200">
                        {wallet.name}
                      </h4>
                      <p className="text-sm text-neutral-silver">
                        {wallet.description}
                      </p>
                    </div>
                    {isConnecting && (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    )}
                  </button>
                ))}

                <div className="pt-4 border-t border-neutral-silver/20">
                  <p className="text-xs text-neutral-silver text-center">
                    By connecting your wallet, you agree to our{' '}
                    <a href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
