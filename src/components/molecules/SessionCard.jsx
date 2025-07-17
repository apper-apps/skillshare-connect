import { motion } from "framer-motion";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";

const SessionCard = ({ session, onStatusChange }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-success-green text-white";
      case "pending":
        return "bg-warning-orange text-white";
      case "completed":
        return "bg-info-blue text-white";
      case "cancelled":
        return "bg-error-red text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return "CheckCircle";
      case "pending":
        return "Clock";
      case "completed":
        return "Award";
      case "cancelled":
        return "XCircle";
      default:
        return "Calendar";
    }
  };

  const formatSessionTime = (date) => {
    return format(new Date(date), "MMM d, yyyy 'at' h:mm a");
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-lg shadow-card p-6 border border-gray-200 hover:shadow-card-hover transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-forest-green to-fresh-green rounded-lg flex items-center justify-center">
            <ApperIcon name="BookOpen" size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-gray-900">
              Guitar Lesson
            </h3>
            <p className="text-sm text-gray-600">with John Smith</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
          <div className="flex items-center space-x-1">
            <ApperIcon name={getStatusIcon(session.status)} size={12} />
            <span className="capitalize">{session.status}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <ApperIcon name="Calendar" size={16} />
          <span>{formatSessionTime(session.scheduledDate)}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <ApperIcon name="Clock" size={16} />
          <span>{session.duration} minutes</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <ApperIcon name="MapPin" size={16} />
          <span>{session.location}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <ApperIcon name="Coins" size={16} />
          <span>{session.credits} credits</span>
        </div>
      </div>

      {session.status === "pending" && (
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => onStatusChange(session.Id, "confirmed")}
            className="flex-1 btn-primary text-sm py-2"
          >
            Confirm
          </button>
          <button
            onClick={() => onStatusChange(session.Id, "cancelled")}
            className="flex-1 btn-secondary text-sm py-2"
          >
            Cancel
          </button>
        </div>
      )}

      {session.status === "completed" && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Rate this session</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-yellow-400 hover:text-yellow-500 transition-colors"
                >
                  <ApperIcon name="Star" size={16} />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SessionCard;