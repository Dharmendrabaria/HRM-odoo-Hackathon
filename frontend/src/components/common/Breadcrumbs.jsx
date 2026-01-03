import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Capitalize function
  const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <nav className="flex items-center text-sm text-gray-500 mb-6 bg-white px-4 py-3 rounded-xl border border-gray-100 shadow-sm w-fit">
      <Link to="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
        <Home size={16} />
        <span className="sr-only">Home</span>
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={to} className="flex items-center">
            <ChevronRight size={16} className="mx-2 text-gray-400" />
            {isLast ? (
              <span className="font-medium text-gray-900">{capitalize(value)}</span>
            ) : (
              <Link to={to} className="hover:text-blue-600 transition-colors">
                {capitalize(value)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
