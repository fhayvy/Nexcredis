'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

type Theme = 'dark' | 'light' | 'system'

interface ThemeState {
  theme: Theme
  resolvedTheme: 'dark' | 'light'
  systemTheme: 'dark' | 'light'
}

type ThemeAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_SYSTEM_THEME'; payload: 'dark' | 'light' }

const initialState: ThemeState = {
  theme: 'dark',
  resolvedTheme: 'dark',
  systemTheme: 'dark',
}

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'SET_THEME':
      return {
        ...state,
        theme: action.payload,
        resolvedTheme: action.payload === 'system' ? state.systemTheme : action.payload,
      }
    case 'SET_SYSTEM_THEME':
      return {
        ...state,
        systemTheme: action.payload,
        resolvedTheme: state.theme === 'system' ? action.payload : state.resolvedTheme,
      }
    default:
      return state
  }
}

interface ThemeContextType extends ThemeState {
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Add this export line
export { ThemeContext }

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  useEffect(() => {
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') as Theme || 'dark'
    dispatch({ type: 'SET_THEME', payload: savedTheme })

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      dispatch({ type: 'SET_SYSTEM_THEME', payload: e.matches ? 'dark' : 'light' })
    }

    dispatch({ type: 'SET_SYSTEM_THEME', payload: mediaQuery.matches ? 'dark' : 'light' })
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(state.resolvedTheme)
  }, [state.resolvedTheme])

  const setTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme)
    dispatch({ type: 'SET_THEME', payload: theme })
  }

  const value: ThemeContextType = {
    ...state,
    setTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
