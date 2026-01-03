import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  User, 
  Calendar, 
  DollarSign, 
  FileText, 
  Settings, 
  Bell, 
  LayoutDashboard,
  Users,
  Clock,
  Briefcase,
  HelpCircle,
  Command as CommandIcon,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/cn";

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  const commands = [
    {
      group: "Navigation",
      items: [
        { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", path: user?.role === "admin" ? "/admin/dashboard" : "/employee/dashboard" },
        { id: "profile", icon: User, label: "Profile", path: user?.role === "admin" ? "/admin/employees" : "/employee/profile" },
        { id: "attendance", icon: Clock, label: "Attendance", path: user?.role === "admin" ? "/admin/attendance" : "/employee/attendance" },
        { id: "leave", icon: Calendar, label: "Leave", path: user?.role === "admin" ? "/admin/leaves" : "/employee/leave" },
        { id: "payroll", icon: DollarSign, label: "Payroll", path: user?.role === "admin" ? "/admin/payroll" : "/employee/payroll" },
      ],
    },
    {
      group: "Management",
      items: [
        { id: "reports", icon: FileText, label: "Reports", path: user?.role === "admin" ? "/admin/reports" : "/employee/reports" },
        { id: "policies", icon: Briefcase, label: "Policies", path: "/policies" },
        { id: "lifecycle", icon: Users, label: "Employee Lifecycle", path: "/lifecycle", adminOnly: true },
      ],
    },
    {
      group: "Support",
      items: [
        { id: "help", icon: HelpCircle, label: "Help & Support", path: "/support" },
        { id: "notifications", icon: Bell, label: "Notifications", path: user?.role === "admin" ? "/admin/notifications" : "/employee/notifications" },
      ],
    },
  ];

  const filteredCommands = commands.map(group => ({
    ...group,
    items: group.items.filter(item => 
      (!item.adminOnly || user?.role === "admin") &&
      item.label.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  const togglePalette = useCallback(() => setIsOpen(prev => !prev), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        togglePalette();
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePalette]);

  const handleAction = (path) => {
    navigate(path);
    setIsOpen(false);
    setSearch("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-[9999] overflow-hidden"
          >
            <div className="flex items-center p-4 border-b border-slate-100 dark:border-slate-800">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input
                autoFocus
                type="text"
                placeholder="Search commands, pages, and tools..."
                className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 text-lg"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                <CommandIcon className="w-3 h-3 text-slate-500" />
                <span className="text-xs font-medium text-slate-500">K</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="ml-4 p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((group) => (
                  <div key={group.group} className="mb-4 last:mb-0">
                    <h3 className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {group.group}
                    </h3>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleAction(item.path)}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group"
                        >
                          <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors shadow-sm">
                            <item.icon className="w-4 h-4" />
                          </div>
                          <span className="flex-1 text-left font-medium">{item.label}</span>
                          <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            Jump to →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-slate-500">No results found for "{search}"</p>
                </div>
              )}
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div className="flex gap-4">
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-[10px] text-slate-500 shadow-sm">↑↓</kbd>
                  <span className="text-[10px] text-slate-500 font-medium">Navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-[10px] text-slate-500 shadow-sm">Enter</kbd>
                  <span className="text-[10px] text-slate-500 font-medium">Select</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-[10px] text-slate-500 shadow-sm">ESC</kbd>
                  <span className="text-[10px] text-slate-500 font-medium">Close</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-400">DayFlow Command Center</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
