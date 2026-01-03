import { cn } from "../../utils/cn";

const Input = ({ label, error, className, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && <label className="text-[10px] font-black text-muted uppercase tracking-widest">{label}</label>}
      <input
        className={cn(
          "px-4 py-2.5 bg-white border rounded-lg text-sm font-bold text-primary outline-none transition-all placeholder:text-slate-300 placeholder:font-medium",
          error
            ? "border-error focus:ring-4 focus:ring-error/5"
            : "border-slate-200 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 shadow-subtle"
        )}
        {...props}
      />
      {error && <span className="text-[10px] font-bold text-error uppercase tracking-tight">{error}</span>}
    </div>
  );
};

export default Input;
