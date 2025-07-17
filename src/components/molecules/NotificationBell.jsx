import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { useNotifications } from "@/hooks/useNotifications";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const getNotificationIcon = (type) => {
    switch (type) {
      case "match":
        return "Users";
      case "message":
        return "MessageCircle";
      case "session":
        return "Calendar";
      case "rating":
        return "Star";
      default:
        return "Bell";
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "match":
        return "text-fresh-green";
      case "message":
        return "text-info-blue";
      case "session":
        return "text-warm-orange";
      case "rating":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <ApperIcon name="Bell" size={20} className="text-gray-600" />
        
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-error-red text-white text-xs rounded-full flex items-center justify-center font-medium"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.div>
        )}
      </motion.button>

<AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[90vw] bg-white rounded-lg shadow-lg border border-gray-200 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-display font-semibold text-lg text-gray-900">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-forest-green hover:text-fresh-green font-medium transition-colors"
                >
                  Mark all read
                </button>
              )}
            </div>

{/* Notifications List */}
            <div className="max-h-80 sm:max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 sm:p-8 text-center">
                  <ApperIcon name="Bell" size={48} className="text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <motion.div
                      key={notification.Id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
className={`p-3 sm:p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        !notification.read ? "bg-blue-50 border-l-4 border-l-info-blue" : ""
                      }`}
                      onClick={() => markAsRead(notification.Id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                          <ApperIcon name={getNotificationIcon(notification.type)} size={16} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-info-blue rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 border-t border-gray-200">
                <button className="w-full text-sm text-forest-green hover:text-fresh-green font-medium transition-colors">
                  View all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;