import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const SkillFilters = ({ filters, onFilterChange, resultCount }) => {
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Technology", label: "Technology" },
    { value: "Music", label: "Music" },
    { value: "Cooking", label: "Cooking" },
    { value: "Fitness", label: "Fitness" },
    { value: "Art", label: "Art" },
    { value: "Language", label: "Language" },
    { value: "Business", label: "Business" },
    { value: "Crafts", label: "Crafts" },
    { value: "Sports", label: "Sports" },
    { value: "Education", label: "Education" }
  ];

  const types = [
    { value: "all", label: "All Types" },
    { value: "offer", label: "Offering" },
    { value: "request", label: "Requesting" }
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "title", label: "Title A-Z" },
    { value: "category", label: "Category A-Z" }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category !== "all") count++;
    if (filters.type !== "all") count++;
    if (filters.sortBy !== "newest") count++;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h3 className="font-display font-semibold text-lg text-gray-900">
            Filters
          </h3>
          <span className="text-sm text-gray-500">
            {resultCount} {resultCount === 1 ? "skill" : "skills"} found
          </span>
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2 text-forest-green hover:text-fresh-green transition-colors"
        >
          <ApperIcon name="Filter" size={18} />
          <span className="text-sm font-medium">
            {showFilters ? "Hide" : "Show"} Filters
          </span>
          {getActiveFiltersCount() > 0 && (
            <span className="bg-warm-orange text-white text-xs px-2 py-1 rounded-full">
              {getActiveFiltersCount()}
            </span>
          )}
        </button>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {types.slice(1).map((type) => (
          <motion.button
            key={type.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleFilterChange("type", type.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filters.type === type.value
                ? "bg-forest-green text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {type.label}
          </motion.button>
        ))}
      </div>

      {/* Detailed Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200"
        >
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full input-field"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="w-full input-field"
            >
              {types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="w-full input-field"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>
      )}

      {/* Clear Filters */}
      {getActiveFiltersCount() > 0 && (
        <div className="pt-4 border-t border-gray-200 mt-4">
          <button
            onClick={() => onFilterChange({ category: "all", type: "all", sortBy: "newest" })}
            className="text-sm text-warm-orange hover:text-orange-600 font-medium transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default SkillFilters;