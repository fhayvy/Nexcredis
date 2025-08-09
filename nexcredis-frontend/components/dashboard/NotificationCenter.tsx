'use client';

import React from 'react';
import { useNotification } from '@/hooks/use-notification';
import { BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';

interface NotificationCenterProps {
  onClose?: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const { notifications, removeNotification, clearNotifications } = useNotification();

  const handleClearAll = () => {
    clearNotifications();
    onClose?.();
  };

  if (notifications.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 min-w-80">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Notifications</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <p className="text-gray-500 text-sm">No notifications</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 min-w-80 max-w-96">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <div className="flex items-center gap-2">
          {notifications.length > 1 && (
            <Button 
              onClick={handleClearAll}
              variant="ghost"
              size="sm"
              className="text-xs"
            >
              Clear All
            </Button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            className={`p-3 rounded border-l-4 ${
              notification.type === 'success' ? 'border-green-500 bg-green-50' :
              notification.type === 'error' ? 'border-red-500 bg-red-50' :
              notification.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
              'border-blue-500 bg-blue-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <p className="text-sm text-gray-800">{notification.message}</p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="ml-2 text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationCenter;
