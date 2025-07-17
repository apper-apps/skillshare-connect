import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import { useUser } from "@/hooks/useUser";
import NotificationBell from "@/components/molecules/NotificationBell";
import SearchBar from "@/components/molecules/SearchBar";

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const navItems = [
    { path: "/", label: "Browse Skills", icon: "BookOpen" },
    { path: "/exchanges", label: "My Exchanges", icon: "Users" },
    { path: "/messages", label: "Messages", icon: "MessageCircle" },
    { path: "/calendar", label: "Calendar", icon: "Calendar" },
    { path: "/profile", label: "Profile", icon: "User" }
  ];

  const handleSearch = (query) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-forest-green to-fresh-green rounded-lg flex items-center justify-center">
              <ApperIcon name="Users" size={24} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl gradient-text">
              SkillShare Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "text-forest-green bg-soft-beige"
                    : "text-gray-700 hover:text-forest-green hover:bg-gray-50"
                }`}
              >
                <ApperIcon name={item.icon} size={18} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

{/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-md mx-6">
            <SearchBar onSearch={handleSearch} />
          </div>
{/* Right Side */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Credits Display */}
            <motion.div
              className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-forest-green to-fresh-green text-white px-2 sm:px-3 py-1 rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <ApperIcon name="Coins" size={16} />
              <span className="text-sm font-medium">{user?.credits || 0}</span>
            </motion.div>

            {/* Notifications */}
            <NotificationBell />
            {/* Profile Dropdown */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-warm-orange to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {user?.name?.charAt(0) || "U"}
                  </span>
                </div>
                <ApperIcon name="ChevronDown" size={16} className="text-gray-400" />
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  >
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <ApperIcon name="User" size={16} />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <ApperIcon name="Settings" size={16} />
                      <span>Settings</span>
                    </Link>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button className="flex items-center space-x-2 px-4 py-2 text-sm text-error-red hover:bg-red-50 w-full text-left">
                      <ApperIcon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

{/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <nav className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? "text-forest-green bg-soft-beige"
                      : "text-gray-700 hover:text-forest-green hover:bg-gray-50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ApperIcon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;