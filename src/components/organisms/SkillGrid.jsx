import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import SkillCard from "@/components/molecules/SkillCard";
import SkillFilters from "@/components/molecules/SkillFilters";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { skillService } from "@/services/api/skillService";

const SkillGrid = ({ searchQuery = "" }) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    type: "all",
    sortBy: "newest"
  });
  const navigate = useNavigate();

  const loadSkills = async () => {
    try {
      setLoading(true);
      setError("");
      
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const data = await skillService.getAll();
      setSkills(data);
    } catch (err) {
      setError("Failed to load skills. Please try again.");
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSkillClick = (skill) => {
    navigate(`/skill/${skill.Id}`);
  };

  const handleAddSkill = () => {
    navigate("/add-skill");
  };

  const getFilteredSkills = () => {
    let filtered = skills;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(skill =>
        skill.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(skill => skill.category === filters.category);
    }

    // Apply type filter
    if (filters.type !== "all") {
      filtered = filtered.filter(skill => skill.type === filters.type);
    }

    // Apply sorting
    switch (filters.sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "category":
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredSkills = getFilteredSkills();

  if (loading) {
    return <Loading type="skills" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadSkills} type="network" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold gradient-text">
            Skill Exchange
          </h1>
          <p className="text-gray-600 mt-2">
            Discover and share skills with your neighbors
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddSkill}
          className="btn-primary inline-flex items-center space-x-2"
        >
          <ApperIcon name="Plus" size={18} />
          <span>Add Skill</span>
        </motion.button>
      </div>

      {/* Filters */}
      <SkillFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        resultCount={filteredSkills.length}
      />

      {/* Skills Grid */}
      <AnimatePresence mode="wait">
        {filteredSkills.length === 0 ? (
          <Empty
            type={searchQuery ? "search" : "skills"}
            title={searchQuery ? "No skills match your search" : undefined}
            message={searchQuery ? `No skills found for "${searchQuery}". Try different keywords or check your spelling.` : undefined}
            onAction={searchQuery ? () => window.location.reload() : handleAddSkill}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SkillCard
                  skill={skill}
                  onClick={() => handleSkillClick(skill)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SkillGrid;