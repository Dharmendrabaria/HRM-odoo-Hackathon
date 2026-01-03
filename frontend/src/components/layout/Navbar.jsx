import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useLocation, Link } from "react-router-dom";
import { Bell, ChevronRight, Menu, Search, User, LogOut } from "lucide-react";
import { cn } from "../../utils/cn";
import NotificationDropdown from "../notifications/NotificationDropdown";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [notifRef, profileRef]);
  
  return (
    <header className="h-16 bg-white border-b border-border sticky top-0 z-40 px-4 md:px-8">
      <div className="h-full flex items-center justify-between gap-4">
        {/* Left Side: Menu Toggle + Breadcrumbs */}
        <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
            <button 
                onClick={onMenuClick}
                className="p-2 -ml-2 rounded-lg hover:bg-surface-hover text-text-muted lg:hidden shrink-0"
            >
                <Menu size={20} />
            </button>
            
            {/* Breadcrumbs / Page Title */}
            <div className="flex flex-col justify-center">
                <div className="hidden md:flex items-center gap-2 overflow-hidden">
                    <span className="text-[10px] font-bold text-text-muted/60 uppercase tracking-widest shrink-0">HRM</span>
                    {pathnames.map((name, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <ChevronRight size={14} className="text-border shrink-0" />
                            <span className={cn(
                                "text-xs font-semibold uppercase tracking-wide truncate",
                                i === pathnames.length - 1 ? "text-text-heading" : "text-text-muted"
                            )}>
                                {name.replace("-", " ")}
                            </span>
                        </div>
                    ))}
                </div>
                <h2 className="text-sm font-bold text-text-heading truncate md:hidden">
                  {pathnames[pathnames.length - 1]?.replace("-", " ") || "Dashboard"}
                </h2>
            </div>
        </div>

        {/* Right Side: Actions + User */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Global Search */}
            <button className="p-2 rounded-lg text-text-muted hover:bg-surface-hover hover:text-text-heading hidden sm:flex transition-colors">
              <Search size={20} />
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
                <button 
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className={cn(
                    "relative p-2 rounded-lg transition-all",
                    isNotifOpen ? "bg-primary-soft text-primary" : "text-text-muted hover:bg-surface-hover hover:text-text-heading"
                    )}
                >
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-white"></span>
                </button>
                {isNotifOpen && <NotificationDropdown onClose={() => setIsNotifOpen(false)} />}
            </div>
            
            <div className="h-6 w-px bg-divider hidden sm:block"></div>

            {/* User Profile */}
            <div className="relative" ref={profileRef}>
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 md:gap-3 group cursor-pointer pl-1"
              >
                  <div className="text-right hidden sm:block">
                      <p className="text-sm font-bold text-text-heading leading-none truncate max-w-[120px]">{user?.name}</p>
                      <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-1">{user?.role}</p>
                  </div>
                  <div className="relative">
                      <img
                          src={
                            user?.profileImage 
                              ? `http://localhost:5000${user.profileImage}` 
                              : `https://ui-avatars.com/api/?name=${user?.name}&background=5b5bd6&color=fff`
                          }
                          alt={user?.name}
                          className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover ring-2 ring-white group-hover:ring-primary/20 transition-all shrink-0"
                      />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full ring-2 ring-white"></div>
                  </div>
              </div>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-border py-2 z-50">
                  <Link
                    to={user?.role === 'admin' ? '/admin/profile' : '/employee/profile'}
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-hover transition-colors"
                  >
                    <User size={18} className="text-text-muted" />
                    <span className="text-sm font-medium text-text-heading">My Profile</span>
                  </Link>
                  <div className="h-px bg-border my-1"></div>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      logout();
                    }}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <LogOut size={18} className="text-red-600" />
                    <span className="text-sm font-medium text-red-600">Logout</span>
                  </button>
                </div>
              )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
