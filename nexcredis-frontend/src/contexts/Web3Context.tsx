'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { ethers } from 'ethers'

interface Web3State {
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null
  account: string | null
  balance: number | null
  chainId: number | null
  isConnected: boolean
  isLoading: boolean
  error: string | null
}

type Web3Action =
  | { type: 'WEB3_START' }
  | { type: 'WEB3_SUCCESS'; payload: Partial<Web3State> }
  | { type: 'WEB3_ERROR'; payload: string }
  | { type: 'WEB3_DISCONNECT' }
  | { type: 'UPDATE_BALANCE'; payload: number }

const initialState: Web3State = {
  provider: null,
  signer: null,
  account: null,
  balance: null,
  chainId: null,
  isConnected: false,
  isLoading: false,
  error: null,
}

function web3Reducer(state: Web3State, action: Web3Action): Web3State {
  switch (action.type) {
    case 'WEB3_START':
      return { ...state, isLoading: true, error: null }
    case 'WEB3_SUCCESS':
      return { ...state, ...action.payload, isLoading: false, error: null }
    case 'WEB3_ERROR':
      return { ...state, isLoading: false, error: action.payload }
    case 'WEB3_DISCONNECT':
      return { ...initialState }
    case 'UPDATE_BALANCE':
      return { ...state, balance: action.payload }
    default:
      return state
  }
}

interface Web3ContextType extends Web3State {
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  switchNetwork: (chainId: number) => Promise<void>
  sendTransaction: (to: string, value: string) => Promise<string>
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

// Add this export line
export { Web3Context }

// Hedera Testnet configuration
const HEDERA_TESTNET = {
  chainId: '0x128', // 296 in hex
  chainName: 'Hedera Testnet',
  nativeCurrency: {
    name: 'HBAR',
    symbol: 'HBAR',
    decimals: 18,
  },
  rpcUrls: ['https://testnet.hashio.io/api'],
  blockExplorerUrls: ['https://hashscan.io/testnet'],
}

export function Web3Provider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(web3Reducer, initialState)

  useEffect(() => {
    // Check if already connected
    if (typeof window !== 'undefined' && window.ethereum) {
      checkConnection()
    }
  }, [])

  const checkConnection = async () => {
    try {
      if (!window.ethereum) return;
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })
      if (accounts.length > 0) {
        await connect()
      }
    } catch (error) {
      console.error('Connection check failed:', error)
    }
  }

  const connect = async () => {
    if (!window.ethereum) {
      dispatch({ type: 'WEB3_ERROR', payload: 'MetaMask not installed' })
      return
    }

    dispatch({ type: 'WEB3_START' })

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const network = await provider.getNetwork()
      const balance = await provider.getBalance(accounts[0])

      dispatch({
        type: 'WEB3_SUCCESS',
        payload: {
          provider,
          signer,
          account: accounts[0],
          balance: parseFloat(ethers.formatEther(balance)),
          chainId: Number(network.chainId),
          isConnected: true,
        },
      })

      // Switch to Hedera testnet if not already connected
      if (Number(network.chainId) !== 296) {
        await switchNetwork(296)
      }

      // Set up event listeners
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
      window.ethereum.on('disconnect', handleDisconnect)

    } catch (error: any) {
      dispatch({ type: 'WEB3_ERROR', payload: error.message })
    }
  }

  const disconnect = async () => {
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum.removeListener('chainChanged', handleChainChanged)
      window.ethereum.removeListener('disconnect', handleDisconnect)
    }
    dispatch({ type: 'WEB3_DISCONNECT' })
  }

  const switchNetwork = async (chainId: number) => {
    if (!window.ethereum) return

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
    } catch (error: any) {
      // If network doesn't exist, add it
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [HEDERA_TESTNET],
          })
        } catch (addError) {
          dispatch({ type: 'WEB3_ERROR', payload: 'Failed to add network' })
        }
      } else {
        dispatch({ type: 'WEB3_ERROR', payload: 'Failed to switch network' })
      }
    }
  }

  const sendTransaction = async (to: string, value: string): Promise<string> => {
    if (!state.signer) {
      throw new Error('No signer available')
    }

    try {
      const tx = await state.signer.sendTransaction({
        to,
        value: ethers.parseEther(value),
      })
      return tx.hash
    } catch (error: any) {
      throw new Error(`Transaction failed: ${error.message}`)
    }
  }

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnect()
    } else {
      dispatch({
        type: 'WEB3_SUCCESS',
        payload: { account: accounts[0] },
      })
    }
  }

  const handleChainChanged = (chainId: string) => {
    dispatch({
      type: 'WEB3_SUCCESS',
      payload: { chainId: parseInt(chainId, 16) },
    })
  }

  const handleDisconnect = () => {
    disconnect()
  }

  const value: Web3ContextType = {
    ...state,
    connect,
    disconnect,
    switchNetwork,
    sendTransaction,
  }

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

export function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider')
  }
  return context
}
