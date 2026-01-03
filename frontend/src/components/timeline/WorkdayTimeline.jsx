import React from "react";
import { motion } from "framer-motion";
import { 
  LogIn, 
  Coffee, 
  LogOut, 
  Clock, 
  MapPin, 
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { cn } from "../../utils/cn";

const WorkdayTimeline = ({ activities = [] }) => {
  // Default activities for mock if none provided
  const displayActivities = activities.length > 0 ? activities : [
    { type: "checkin", time: "09:00 AM", location: "Headquarters", status: "completed" },
    { type: "break", time: "11:30 AM", label: "Morning Tea", status: "completed" },
    { type: "checkin", time: "11:45 AM", label: "Resumed Work", status: "completed" },
    { type: "break", time: "01:30 PM", label: "Lunch Break", status: "completed" },
    { type: "checkin", time: "02:15 PM", label: "Resumed Work", status: "active" },
    { type: "checkout", time: "Pending", status: "upcoming" }
  ];

  const getIcon = (type) => {
    switch (type) {
      case "checkin": return LogIn;
      case "break": return Coffee;
      case "checkout": return LogOut;
      default: return Clock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed": return "text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800";
      case "active": return "text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800 ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-slate-900";
      case "upcoming": return "text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800";
      default: return "text-slate-500";
    }
  };

  return (
    <div className="relative py-4">
      <div className="absolute left-[21px] top-6 bottom-6 w-0.5 bg-slate-200 dark:bg-slate-800" />
      
      <div className="space-y-8">
        {displayActivities.map((activity, index) => {
          const Icon = getIcon(activity.type);
          const statusStyles = getStatusColor(activity.status);
          
          return (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-4"
            >
              <div className={cn(
                "relative z-10 flex items-center justify-center w-[44px] h-[44px] rounded-full border shadow-sm transition-all",
                statusStyles
              )}>
                <Icon className="w-5 h-5" />
                {activity.status === "active" && (
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-900" 
                  />
                )}
              </div>

              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={cn(
                    "font-semibold capitalize",
                    activity.status === "upcoming" ? "text-slate-400" : "text-slate-900 dark:text-white"
                  )}>
                    {activity.label || activity.type.replace(/([A-Z])/g, ' $1')}
                  </h4>
                  <span className={cn(
                    "text-sm font-medium",
                    activity.status === "active" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500"
                  )}>
                    {activity.time}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  {activity.location && (
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="w-3 h-3" />
                      {activity.location}
                    </div>
                  )}
                  {activity.status === "completed" && (
                    <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                  {activity.status === "active" && (
                    <div className="flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400">
                      <Clock className="w-3 h-3" />
                      Currently tracking
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkdayTimeline;
