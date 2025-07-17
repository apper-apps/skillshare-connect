import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";

const ChatMessage = ({ message, isOwn, user }) => {
  const formatMessageTime = (timestamp) => {
    return format(new Date(timestamp), "h:mm a");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`flex max-w-xs lg:max-w-md ${isOwn ? "flex-row-reverse" : "flex-row"} items-start space-x-2`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isOwn ? "ml-2" : "mr-2"}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-warm-orange to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
        </div>

        {/* Message Bubble */}
        <div className={`relative px-4 py-2 rounded-lg ${
          isOwn 
            ? "bg-gradient-to-r from-forest-green to-fresh-green text-white rounded-br-sm" 
            : "bg-white text-gray-900 border border-gray-200 rounded-bl-sm"
        }`}>
          <p className="text-sm">{message.content}</p>
          
          {/* Message Actions */}
          {message.type === "session_request" && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center space-x-2 text-xs opacity-75">
                <ApperIcon name="Calendar" size={14} />
                <span>Session Request</span>
              </div>
              {!isOwn && (
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-white/20 text-white rounded text-xs hover:bg-white/30 transition-colors">
                    Accept
                  </button>
                  <button className="px-3 py-1 bg-white/20 text-white rounded text-xs hover:bg-white/30 transition-colors">
                    Decline
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Timestamp */}
          <div className={`text-xs mt-1 ${isOwn ? "text-white/75" : "text-gray-500"}`}>
            {formatMessageTime(message.timestamp)}
            {isOwn && (
              <span className="ml-2">
                <ApperIcon name="Check" size={12} />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;