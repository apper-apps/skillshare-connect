import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title, 
  message, 
  actionText, 
  onAction, 
  type = "general",
  icon 
}) => {
  const getEmptyConfig = () => {
    switch (type) {
      case "skills":
        return {
          icon: "BookOpen",
          title: "No Skills Listed Yet",
          message: "Start building your community by sharing a skill you can teach or something you'd like to learn.",
          actionText: "Add Your First Skill",
          bgGradient: "from-fresh-green to-green-400"
        };
      case "matches":
        return {
          icon: "Users",
          title: "No Matches Found",
          message: "We're working on finding the perfect skill exchange partners for you. Try adjusting your preferences or adding more skills.",
          actionText: "Browse Skills",
          bgGradient: "from-warm-orange to-orange-500"
        };
      case "messages":
        return {
          icon: "MessageCircle",
          title: "No Messages Yet",
          message: "Once you connect with skill partners, your conversations will appear here to help coordinate sessions.",
          actionText: "Find Matches",
          bgGradient: "from-info-blue to-blue-500"
        };
      case "sessions":
        return {
          icon: "Calendar",
          title: "No Sessions Scheduled",
          message: "Your upcoming skill exchange sessions will appear here. Start by finding matches and scheduling your first session.",
          actionText: "Schedule Session",
          bgGradient: "from-purple-500 to-purple-600"
        };
      case "search":
        return {
          icon: "Search",
          title: "No Results Found",
          message: "Try adjusting your search terms or filters to find the skills you're looking for.",
          actionText: "Clear Filters",
          bgGradient: "from-gray-500 to-gray-600"
        };
      default:
        return {
          icon: "Smile",
          title: "Nothing Here Yet",
          message: "Content will appear here once you start using the app.",
          actionText: "Get Started",
          bgGradient: "from-forest-green to-fresh-green"
        };
    }
  };

  const config = getEmptyConfig();
  const displayIcon = icon || config.icon;
  const displayTitle = title || config.title;
  const displayMessage = message || config.message;
  const displayActionText = actionText || config.actionText;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className={`w-24 h-24 bg-gradient-to-br ${config.bgGradient} rounded-full flex items-center justify-center mb-6 shadow-lg`}>
        <ApperIcon name={displayIcon} size={48} className="text-white" />
      </div>
      
      <h3 className="text-2xl font-display font-semibold text-gray-900 mb-3">
        {displayTitle}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {displayMessage}
      </p>
      
      {onAction && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <ApperIcon name="Plus" size={18} />
          <span>{displayActionText}</span>
        </motion.button>
      )}
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
        <div className="p-4 bg-white rounded-lg shadow-card">
          <ApperIcon name="Users" size={24} className="text-fresh-green mx-auto mb-2" />
          <h4 className="font-medium text-gray-900">Find Partners</h4>
          <p className="text-sm text-gray-600 mt-1">Connect with neighbors who share your interests</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow-card">
          <ApperIcon name="Clock" size={24} className="text-warm-orange mx-auto mb-2" />
          <h4 className="font-medium text-gray-900">Earn Credits</h4>
          <p className="text-sm text-gray-600 mt-1">Build time-bank credits through skill sharing</p>
        </div>
        
        <div className="p-4 bg-white rounded-lg shadow-card">
          <ApperIcon name="Star" size={24} className="text-info-blue mx-auto mb-2" />
          <h4 className="font-medium text-gray-900">Build Reputation</h4>
          <p className="text-sm text-gray-600 mt-1">Earn ratings and reviews from the community</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Empty;