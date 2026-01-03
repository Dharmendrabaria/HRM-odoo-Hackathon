import { cn } from "../../utils/cn";

const Badge = ({ children, variant = "default", className, dot = true }) => {
  const variants = {
    default: "bg-background text-text-muted",
    success: "bg-success-soft text-success", // Green text on soft green bg
    warning: "bg-warning-soft text-warning", // Amber text on soft amber bg
    error: "bg-error-soft text-error", // Red text on soft red bg
    info: "bg-info-soft text-info", // Blue text on soft blue bg
    primary: "bg-primary-soft text-primary",
  };

  const dotColors = {
    default: "bg-text-muted",
    success: "bg-success",
    warning: "bg-warning",
    error: "bg-error",
    info: "bg-info",
    primary: "bg-primary",
  };

  return (
    <span className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold", 
        variants[variant], 
        className
    )}>
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full", dotColors[variant])}></span>}
      {children}
    </span>
  );
};

export default Badge;
