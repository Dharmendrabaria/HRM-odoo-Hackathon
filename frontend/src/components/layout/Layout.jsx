import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import CommandPalette from "../commandPalette/CommandPalette";
import { cn } from "../../utils/cn";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  return (
    <div className="flex bg-background min-h-screen relative overflow-x-hidden">
      <CommandPalette />
      
      {/* Sidebar - Desktop fixed, Mobile drawer */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Areas */}
      <div className={cn(
        "flex-1 flex flex-col min-w-0 transition-all duration-300",
        "lg:ml-64" // Offset for fixed desktop sidebar
      )}>
        <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 w-full max-w-[1600px] mx-auto pt-4 px-4 md:pt-6 md:px-6 lg:pt-8 lg:px-8 pb-20 md:pb-12">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
