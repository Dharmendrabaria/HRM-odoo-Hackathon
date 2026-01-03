import { cn } from "../../utils/cn"; // Assuming utils exist or I will create helper

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200/70", className)}
      {...props}
    />
  );
};

export { Skeleton };
