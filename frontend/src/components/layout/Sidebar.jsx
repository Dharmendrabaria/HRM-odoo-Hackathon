import { LayoutDashboard, Users, Calendar, FileText, DollarSign, LogOut, PieChart, HelpCircle, Shield, Sparkles, Briefcase, X, Target, MapPin, Rocket } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const employeeLinks = [
    { name: "Dashboard", path: "/employee/dashboard", icon: LayoutDashboard },
    { name: "Calendar", path: "/employee/calendar", icon: MapPin },
    { name: "Performance", path: "/employee/performance", icon: Target },
    { name: "Attendance", path: "/employee/attendance", icon: Calendar },
    { name: "Leaves", path: "/employee/leave", icon: FileText },
    { name: "Payroll", path: "/employee/payroll", icon: DollarSign },
    { name: "Insights", path: "/employee/insights", icon: Sparkles },
    { name: "Support", path: "/employee/support", icon: HelpCircle },
  ];

  const adminLinks = [
    { name: "Overview", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Calendar", path: "/admin/calendar", icon: MapPin },
    { name: "Performance", path: "/admin/performance", icon: Target },
    { name: "Directory", path: "/admin/employees", icon: Users },
    { name: "Lifecycle", path: "/admin/lifecycle", icon: Rocket },
    { name: "Attendance", path: "/admin/attendance", icon: Calendar },
    { name: "Payroll", path: "/admin/payroll", icon: DollarSign },
    { name: "Org Chart", path: "/admin/org-chart", icon: Briefcase },
    { name: "Reports", path: "/admin/reports", icon: PieChart },
  ];

  const links = user?.role === "admin" ? adminLinks : employeeLinks;

  return (
    <>
      <aside className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar-bg flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 w-64 border-r border-sidebar-border",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo & Close Button */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
              <span className="text-primary font-bold text-lg">D</span>
            </div>
            <h1 className="text-lg font-bold text-white tracking-tight">Dayflow</h1>
          </div>
          <button 
            className="p-2 text-sidebar-text hover:text-white lg:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 scrollbar-hide">
          <div className="px-3 mb-2">
            <p className="text-[11px] font-bold text-sidebar-text/50 uppercase tracking-widest">Main Menu</p>
          </div>
          <ul className="space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                      isActive
                        ? "bg-sidebar-active text-white"
                        : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-r-full"
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    <Icon size={18} className={cn("transition-colors", isActive ? "text-primary" : "text-sidebar-text/80 group-hover:text-white")} />
                    <span className={cn("text-sm font-medium", isActive ? "text-white" : "text-sidebar-text")}>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-3 text-sm font-medium text-sidebar-text hover:text-error hover:bg-sidebar-active/50 rounded-lg transition-all"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
