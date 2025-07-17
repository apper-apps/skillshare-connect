import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  icon, 
  iconPosition = "left",
  loading = false,
  disabled = false,
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-forest-green to-fresh-green text-white hover:shadow-lg focus:ring-fresh-green",
    secondary: "bg-white text-forest-green border-2 border-forest-green hover:bg-soft-beige focus:ring-forest-green",
    accent: "bg-gradient-to-r from-warm-orange to-orange-500 text-white hover:shadow-lg focus:ring-warm-orange",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    danger: "bg-error-red text-white hover:bg-red-600 focus:ring-error-red"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" size={iconSizes[size]} className="animate-spin mr-2" />
      )}
      
      {icon && iconPosition === "left" && !loading && (
        <ApperIcon name={icon} size={iconSizes[size]} className="mr-2" />
      )}
      
      {children}
      
      {icon && iconPosition === "right" && !loading && (
        <ApperIcon name={icon} size={iconSizes[size]} className="ml-2" />
      )}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;