import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";
import { useUser } from "@/hooks/useUser";

const SkillCard = ({ skill, onClick }) => {
  const { users } = useUser();
  const skillUser = users.find(u => u.Id === skill.userId);

  const getCategoryIcon = (category) => {
    const icons = {
      "Technology": "Laptop",
      "Music": "Music",
      "Cooking": "ChefHat",
      "Fitness": "Activity",
      "Art": "Palette",
      "Language": "MessageCircle",
      "Business": "Briefcase",
      "Crafts": "Scissors",
      "Sports": "Trophy",
      "Education": "GraduationCap"
    };
    return icons[category] || "BookOpen";
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Technology": "from-blue-500 to-indigo-600",
      "Music": "from-purple-500 to-pink-600",
      "Cooking": "from-orange-500 to-red-600",
      "Fitness": "from-green-500 to-teal-600",
      "Art": "from-pink-500 to-rose-600",
      "Language": "from-indigo-500 to-purple-600",
      "Business": "from-gray-600 to-gray-700",
      "Crafts": "from-amber-500 to-orange-600",
      "Sports": "from-emerald-500 to-green-600",
      "Education": "from-cyan-500 to-blue-600"
    };
    return colors[category] || "from-forest-green to-fresh-green";
  };

  const getTypeColor = (type) => {
    return type === "offer" ? "text-fresh-green" : "text-warm-orange";
  };

  const getTypeIcon = (type) => {
    return type === "offer" ? "ArrowUp" : "ArrowDown";
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="skill-card group cursor-pointer overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getCategoryColor(skill.category)} flex items-center justify-center shadow-lg`}>
            <ApperIcon name={getCategoryIcon(skill.category)} size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg text-gray-900 group-hover:text-forest-green transition-colors">
              {skill.title}
            </h3>
            <p className="text-sm text-gray-500">{skill.category}</p>
          </div>
        </div>
        
        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full bg-gray-100 ${getTypeColor(skill.type)}`}>
          <ApperIcon name={getTypeIcon(skill.type)} size={14} />
          <span className="text-xs font-medium capitalize">{skill.type}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {skill.description}
      </p>

      {/* Experience Level */}
      <div className="flex items-center space-x-2 mb-4">
        <ApperIcon name="Award" size={16} className="text-gray-400" />
        <span className="text-sm text-gray-600">
          {skill.experienceLevel} level
        </span>
      </div>

      {/* User Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-warm-orange to-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium text-sm">
              {skillUser?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div>
            <p className="font-medium text-sm text-gray-900">
              {skillUser?.name || "Unknown User"}
            </p>
            <p className="text-xs text-gray-500">
              {format(new Date(skill.createdAt), "MMM d, yyyy")}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <ApperIcon name="MapPin" size={14} className="text-gray-400" />
          <span className="text-xs text-gray-500">0.5 mi</span>
        </div>
      </div>

      {/* Match Score (if available) */}
      {skill.matchScore && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Match Score</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-fresh-green to-green-400 transition-all duration-300"
                  style={{ width: `${skill.matchScore}%` }}
                />
              </div>
              <span className="text-sm font-medium text-fresh-green">
                {skill.matchScore}%
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SkillCard;