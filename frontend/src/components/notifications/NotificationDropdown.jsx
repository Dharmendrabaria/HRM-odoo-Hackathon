import { useState } from "react";
import { CheckCircle, XCircle, Info, Bell, Check } from "lucide-react";
import { useToast } from "../../context/ToastContext";

const MOCK_NOTIFS = [
    { id: 1, title: "Leave Approved", message: "Your leave for Oct 25 has been approved.", type: "success", time: "2h ago", read: false, category: "Leave" },
    { id: 2, title: "Salary Credited", message: "October salary has been credited.", type: "info", time: "1d ago", read: false, category: "Payroll" },
    { id: 3, title: "Meeting Reminder", message: "Team standup in 15 mins.", type: "warning", time: "2d ago", read: true, category: "General" },
];

const NotificationDropdown = ({ onClose }) => {
    const { addToast } = useToast();
    const [notifications, setNotifications] = useState(MOCK_NOTIFS);
    const [filter, setFilter] = useState("All");

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        addToast("Marked all as read", "success");
    };

    const handleAction = (id, action) => {
        addToast(`Action ${action} performed on notification ${id}`, "info");
        // Remove or update logic
    };

    const filtered = filter === "All" ? notifications : notifications.filter(n => n.category === filter || (filter === "Unread" && !n.read));

    return (
        <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                     <button onClick={handleMarkAllRead} className="text-xs text-blue-600 hover:text-blue-700 font-medium hover:underline">
                        Mark all read
                    </button>
                )}
            </div>
            
            <div className="flex gap-2 p-2 border-b border-gray-100 overflow-x-auto">
                {["All", "Unread", "Leave", "Payroll"].map(f => (
                    <button 
                        key={f} 
                        onClick={() => setFilter(f)}
                        className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === f ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="max-h-[300px] overflow-y-auto">
                {filtered.length > 0 ? (
                    <div className="divide-y divide-gray-50">
                        {filtered.map(notif => (
                            <div key={notif.id} className={`p-4 hover:bg-gray-50 transition-colors ${!notif.read ? "bg-blue-50/30" : ""}`}>
                                <div className="flex items-start gap-3">
                                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${!notif.read ? "bg-blue-500" : "bg-transparent"}`}></div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className={`text-sm ${!notif.read ? "font-semibold text-gray-900" : "font-medium text-gray-600"}`}>{notif.title}</h4>
                                            <span className="text-xs text-gray-400">{notif.time}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                                        
                                        {/* Actionable Buttons Mockups */}
                                        {notif.category === "Leave" && !notif.read && (
                                            <div className="flex gap-2 mt-2">
                                                <button onClick={() => handleAction(notif.id, "Approve")} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200">Approve</button>
                                                <button onClick={() => handleAction(notif.id, "Reject")} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200">Reject</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 text-center text-gray-400">
                        <Bell size={32} className="mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No notifications</p>
                    </div>
                )}
            </div>
            
            <div className="p-3 border-t border-gray-100 text-center bg-gray-50/50">
                <button className="text-sm text-blue-600 font-medium hover:underline">View All Notifications</button>
            </div>
        </div>
    );
};

export default NotificationDropdown;
