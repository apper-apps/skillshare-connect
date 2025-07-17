import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Avatar = forwardRef(({ 
  className, 
  size = "md", 
  src, 
  alt, 
  fallback,
  online = false,
  ...props 
}, ref) => {
  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
    xl: "w-20 h-20 text-xl"
  };

  const onlineSizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
    xl: "w-5 h-5"
  };

  return (
    <div className={cn("relative", sizes[size])}>
      <div
        ref={ref}
        className={cn(
          "rounded-full flex items-center justify-center font-medium bg-gradient-to-br from-warm-orange to-orange-500 text-white overflow-hidden",
          sizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img 
            src={src} 
            alt={alt} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{fallback}</span>
        )}
      </div>
      
      {online && (
        <div className={cn(
          "absolute bottom-0 right-0 bg-success-green rounded-full border-2 border-white",
          onlineSizes[size]
        )} />
      )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;