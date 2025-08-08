'use client'

import { motion } from 'framer-motion'
import { 
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'
import { useNotifications } from '../../contexts/NotificationContext'
import { formatDistanceToNow } from 'date-fns'

interface NotificationCenterProps {
  onClose: () => void
}

const iconMap = {
  success: CheckCircleIcon,
  error: ExclamationTriangleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
}

const colorMap = {
  success: 'text-hedera-dark',
  error: 'text-accent-coral',
  warning: 'text-accent-orange',
  info: 'text-primary',
}

export default function NotificationCenter({ onClose }: NotificationCenterProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      className="bg-neutral-slate border border-neutral-silver/20 rounded-xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-silver/20">
        <div>
          <h3 className="font-semibold text-neutral-white">Notifications</h3>
          {unreadCount > 0 && (
            <p className="text-sm text-neutral-silver">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-primary hover:text-primary-hover transition-colors duration-200"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-neutral-silver hover:text-neutral-white transition-colors duration-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-neutral-charcoal/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon className="w-8 h-8 text-neutral-silver" />
            </div>
            <p className="text-neutral-silver">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-silver/10">
            {notifications.map((notification) => {
              const Icon = iconMap[notification.type]
              return (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-neutral-charcoal/30 transition-colors duration-200 ${
                    !notification.read ? 'bg-primary/5 border-l-2 border-l-primary' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 ${colorMap[notification.type]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-neutral-white">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-neutral-silver mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-neutral-silver mt-2">
                            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-primary hover:text-primary-hover transition-colors duration-200"
                            >
                              Mark read
                            </button>
                          )}
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="p-1 text-neutral-silver hover:text-accent-coral transition-colors duration-200"
                          >
                            <XMarkIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      {notification.action && (
                        <button
                          onClick={notification.action.onClick}
                          className="mt-3 text-sm text-primary hover:text-primary-hover font-medium transition-colors duration-200"
                        >
                          {notification.action.label}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </motion.div>
  )
}
