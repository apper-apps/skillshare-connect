import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  size = "md",
  icon,
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full transition-all duration-200";
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-forest-green to-fresh-green text-white",
    secondary: "bg-soft-beige text-forest-green",
    accent: "bg-gradient-to-r from-warm-orange to-orange-500 text-white",
    success: "bg-success-green text-white",
    warning: "bg-warning-orange text-white",
    error: "bg-error-red text-white",
    info: "bg-info-blue text-white"
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-2 text-base"
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 16
  };

  return (
    <span
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {icon && (
        <ApperIcon name={icon} size={iconSizes[size]} className="mr-1" />
      )}
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;