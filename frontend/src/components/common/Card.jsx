import { cn } from "../../utils/cn";
import Skeleton from "./Skeleton";

const Card = ({ children, className, title, subtitle, loading, accent, icon: Icon, iconClassName, action, ...props }) => {
  const accentColors = {
    primary: "border-t-primary",
    success: "border-t-success",
    warning: "border-t-warning",
    error: "border-t-error",
    info: "border-t-info",
  };

  return (
    <div 
      className={cn(
        "bg-surface rounded-2xl border border-border transition-all duration-300",
        "shadow-none hover:shadow-hover", // Shadow only on hover
        "p-6",
        accent && `border-t-2 ${accentColors[accent]}`, // Optional top accent
        className
      )} 
      {...props}
    >
      {(title || subtitle || Icon || action) && (
        <div className="mb-6 flex items-start justify-between">
            <div className="flex items-start gap-4">
                {Icon && (
                    <div className={cn(
                        "p-2.5 rounded-full bg-primary-soft text-primary shrink-0 flex items-center justify-center", 
                        iconClassName
                    )}>
                    <Icon size={20} />
                    </div>
                )}
                <div>
                    {title && <h3 className="text-lg font-bold text-text-heading leading-tight">{title}</h3>}
                    {subtitle && <p className="text-sm text-text-muted mt-1 leading-relaxed">{subtitle}</p>}
                </div>
            </div>
            {action && (
                <div className="shrink-0">
                    {action}
                </div>
            )}
        </div>
      )}
      
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Card;
