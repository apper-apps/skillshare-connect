import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { skillService } from "@/services/api/skillService";
import { useUser } from "@/hooks/useUser";

const SkillDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { users } = useUser();

  const loadSkill = async () => {
    try {
      setLoading(true);
      setError("");
      
      const skillId = parseInt(id);
      if (isNaN(skillId)) {
        setError("Invalid skill ID");
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 200));
      
      const data = await skillService.getById(skillId);
      if (!data) {
        setError("Skill not found");
        return;
      }
      
      setSkill(data);
    } catch (err) {
      setError("Failed to load skill details. Please try again.");
      toast.error("Failed to load skill details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkill();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleContact = () => {
    // Navigate to messages or contact functionality
    toast.info("Contact functionality coming soon!");
  };

  const handleBookSession = () => {
    // Navigate to booking functionality
    toast.info("Booking functionality coming soon!");
  };

  if (loading) {
    return <Loading type="skill" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadSkill} type="network" />;
  }

  if (!skill) {
    return <Error message="Skill not found" onRetry={handleBack} type="404" />;
  }

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
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={handleBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-forest-green transition-colors"
      >
        <ApperIcon name="ArrowLeft" size={20} />
        <span>Back to Skills</span>
      </motion.button>

      {/* Skill Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getCategoryColor(skill.category)} flex items-center justify-center shadow-lg`}>
              <ApperIcon name={getCategoryIcon(skill.category)} size={32} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-display font-bold text-gray-900">
                  {skill.title}
                </h1>
                <div className={`flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-100 ${getTypeColor(skill.type)}`}>
                  <ApperIcon name={getTypeIcon(skill.type)} size={16} />
                  <span className="text-sm font-medium capitalize">{skill.type}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-3">{skill.category}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Award" size={16} />
                  <span>{skill.experienceLevel} level</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Calendar" size={16} />
                  <span>{format(new Date(skill.createdAt), "MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="MapPin" size={16} />
                  <span>0.5 mi away</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContact}
              className="btn-secondary flex items-center space-x-2"
            >
              <ApperIcon name="MessageCircle" size={18} />
              <span>Contact</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookSession}
              className="btn-primary flex items-center space-x-2"
            >
              <ApperIcon name="Calendar" size={18} />
              <span>Book Session</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Skill Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
            Description
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {skill.description}
          </p>
        </motion.div>

        {/* User Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
            Skill Provider
          </h2>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-warm-orange to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-lg">
                {skillUser?.name?.charAt(0) || "U"}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">
                {skillUser?.name || "Unknown User"}
              </h3>
              <p className="text-sm text-gray-500">
                {skillUser?.email || "No email available"}
              </p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Star" size={14} />
                  <span>4.9 rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <ApperIcon name="Users" size={14} />
                  <span>127 sessions</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Match Score */}
      {skill.matchScore && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
            Compatibility Score
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Match Score</span>
                <span className="text-lg font-medium text-fresh-green">
                  {skill.matchScore}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.matchScore}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-fresh-green to-green-400"
                />
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Based on your skills, interests, and location
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SkillDetail;