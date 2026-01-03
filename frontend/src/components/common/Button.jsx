import { cn } from "../../utils/cn";

const Button = ({ children, variant = "primary", className, size = "md", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const sizes = {
    sm: "px-3 py-1.5 text-xs h-8",
    md: "px-4 py-2 text-sm h-10",
    lg: "px-6 py-3 text-base h-12",
  };
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-subtle hover:shadow-md hover:-translate-y-[1px] focus:ring-primary",
    secondary: "bg-white text-primary border border-primary hover:bg-primary-soft focus:ring-primary",
    tertiary: "text-text-muted hover:bg-primary-soft hover:text-primary bg-transparent",
    ghost: "text-text-muted hover:bg-primary-soft hover:text-primary bg-transparent", // Alias for tertiary
    success: "bg-success text-success-foreground hover:opacity-90 shadow-subtle hover:shadow-md",
    danger: "bg-error text-error-foreground hover:opacity-90 shadow-subtle hover:shadow-md",
  };

  return (
    <button className={cn(baseStyles, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
