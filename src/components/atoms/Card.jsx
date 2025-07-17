import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  variant = "default",
  padding = "md",
  shadow = "md",
  children, 
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-lg border border-gray-200 transition-all duration-300";
  
  const variants = {
    default: "hover:shadow-card-hover",
    gradient: "bg-gradient-to-br from-white to-gray-50",
    elevated: "shadow-lg hover:shadow-xl"
  };

  const paddings = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8"
  };

  const shadows = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-card",
    lg: "shadow-lg",
    xl: "shadow-xl"
  };

  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        shadows[shadow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;