'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  role: 'learner' | 'instructor' | 'admin' | 'institution'
  avatar?: string
  walletAddress?: string
  isVerified: boolean
  createdAt: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  error: string | null
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_ERROR'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }

const initialState: AuthState = {
  user: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      }
    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      }
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isLoading: false,
        isAuthenticated: false,
        error: null,
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      }
    default:
      return state
  }
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  updateUser: (userData: Partial<User>) => void
  connectWallet: (address: string) => Promise<void>
}

interface RegisterData {
  name: string
  email: string
  password: string
  role: User['role']
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Add this export line
export { AuthContext }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token')
      if (!token) {
        dispatch({ type: 'AUTH_ERROR', payload: 'No token found' })
        return
      }

      // Simulate API call to verify token
      const response = await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (response.ok) {
        const user = await response.json()
        dispatch({ type: 'AUTH_SUCCESS', payload: user })
      } else {
        localStorage.removeItem('auth_token')
        dispatch({ type: 'AUTH_ERROR', payload: 'Invalid token' })
      }
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Authentication check failed' })
    }
  }

  const login = async (email: string, password: string) => {
    dispatch({ type: 'AUTH_START' })
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const { user, token } = await response.json()
        localStorage.setItem('auth_token', token)
        dispatch({ type: 'AUTH_SUCCESS', payload: user })
        
        // Redirect based on role
        const redirectPath = user.role === 'admin' ? '/admin' : '/dashboard'
        router.push(redirectPath)
      } else {
        const error = await response.json()
        dispatch({ type: 'AUTH_ERROR', payload: error.message })
      }
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Login failed' })
    }
  }

  const register = async (userData: RegisterData) => {
    dispatch({ type: 'AUTH_START' })
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      })

      if (response.ok) {
        const { user, token } = await response.json()
        localStorage.setItem('auth_token', token)
        dispatch({ type: 'AUTH_SUCCESS', payload: user })
        router.push('/onboarding')
      } else {
        const error = await response.json()
        dispatch({ type: 'AUTH_ERROR', payload: error.message })
      }
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: 'Registration failed' })
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('auth_token')
      dispatch({ type: 'AUTH_LOGOUT' })
      router.push('/')
    }
  }

  const updateUser = (userData: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData })
  }

  const connectWallet = async (address: string) => {
    try {
      const response = await fetch('/api/auth/connect-wallet', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
        body: JSON.stringify({ walletAddress: address }),
      })

      if (response.ok) {
        updateUser({ walletAddress: address })
      }
    } catch (error) {
      console.error('Wallet connection failed:', error)
    }
  }

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    connectWallet,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
