'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { toast } from 'react-hot-toast'

interface Notification {
  id: string
  title: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  timestamp: Date
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
}

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp' | 'read'> }
  | { type: 'MARK_READ'; payload: string }
  | { type: 'MARK_ALL_READ' }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'CLEAR_ALL' }

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
}

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
      }
      
      const notifications = [notification, ...state.notifications]
      return {
        notifications,
        unreadCount: state.unreadCount + 1,
      }
    }
    case 'MARK_READ': {
      const notifications = state.notifications.map(n =>
        n.id === action.payload ? { ...n, read: true } : n
      )
      const unreadCount = notifications.filter(n => !n.read).length
      return { notifications, unreadCount }
    }
    case 'MARK_ALL_READ': {
      const notifications = state.notifications.map(n => ({ ...n, read: true }))
      return { notifications, unreadCount: 0 }
    }
    case 'REMOVE_NOTIFICATION': {
      const notifications = state.notifications.filter(n => n.id !== action.payload)
      const unreadCount = notifications.filter(n => !n.read).length
      return { notifications, unreadCount }
    }
    case 'CLEAR_ALL':
      return initialState
    default:
      return state
  }
}

interface NotificationContextType extends NotificationState {
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAll: () => void
  showToast: (message: string, type?: 'success' | 'error' | 'warning') => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Add this export line
export { NotificationContext }

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
  }

  const markAsRead = (id: string) => {
    dispatch({ type: 'MARK_READ', payload: id })
  }

  const markAllAsRead = () => {
    dispatch({ type: 'MARK_ALL_READ' })
  }

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' })
  }

  const showToast = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    const toastOptions = {
      duration: 4000,
      style: {
        background: type === 'success' ? '#20B2AA' : type === 'error' ? '#FF6B6B' : '#FFA500',
        color: '#FFFFFF',
        borderRadius: '12px',
        padding: '16px',
        fontSize: '14px',
        fontWeight: '500',
      },
    }

    if (type === 'success') {
      toast.success(message, toastOptions)
    } else if (type === 'error') {
      toast.error(message, toastOptions)
    } else {
      toast(message, toastOptions)
    }
  }

  const value: NotificationContextType = {
    ...state,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    showToast,
  }

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}
