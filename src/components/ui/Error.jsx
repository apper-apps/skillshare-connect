import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry, type = "general" }) => {
  const getErrorIcon = () => {
    switch (type) {
      case "network":
        return "WifiOff";
      case "notFound":
        return "Search";
      case "permission":
        return "Lock";
      default:
        return "AlertTriangle";
    }
  };

  const getErrorTitle = () => {
    switch (type) {
      case "network":
        return "Connection Problem";
      case "notFound":
        return "Nothing Found";
      case "permission":
        return "Access Denied";
      default:
        return "Something Went Wrong";
    }
  };

  const getErrorMessage = () => {
    if (message) return message;
    
    switch (type) {
      case "network":
        return "Please check your internet connection and try again.";
      case "notFound":
        return "We couldn't find what you're looking for.";
      case "permission":
        return "You don't have permission to access this content.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className="w-20 h-20 bg-gradient-to-br from-error-red to-red-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
        <ApperIcon name={getErrorIcon()} size={40} className="text-white" />
      </div>
      
      <h3 className="text-2xl font-display font-semibold text-gray-900 mb-3">
        {getErrorTitle()}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {getErrorMessage()}
      </p>
      
      {onRetry && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <ApperIcon name="RefreshCw" size={18} />
          <span>Try Again</span>
        </motion.button>
      )}
      
      <div className="mt-8 p-4 bg-soft-beige rounded-lg max-w-md">
        <p className="text-sm text-gray-600">
          <strong>Need help?</strong> Contact our support team or check our status page for updates.
        </p>
      </div>
    </motion.div>
  );
};

export default Error;