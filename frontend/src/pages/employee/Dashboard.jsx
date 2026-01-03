import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import AttendanceChart from "../../components/charts/AttendanceChart";
import LeaveChart from "../../components/charts/LeaveChart";
import TrendChart from "../../components/charts/TrendChart";
import { Clock, Calendar, FileText, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import api from "../../services/api";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    attendance: "0%",
    pendingLeaves: 0,
    payslips: 0,
    attendanceData: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await api.get('/users/dashboard');
        if (data.success) {
          setDashboardData(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const stats = [
    { title: "Attendance", value: dashboardData.attendance, icon: Clock, accent: "primary", iconClass: "bg-primary-soft text-primary" },
    { title: "Pending Leaves", value: dashboardData.pendingLeaves, icon: Calendar, accent: "warning", iconClass: "bg-warning-soft text-warning" },
    { title: "Payslips", value: dashboardData.payslips, icon: FileText, accent: "success", iconClass: "bg-success-soft text-success" },
  ];

  // Fallback if no data
  const chartData = dashboardData.attendanceData.length > 0 
    ? dashboardData.attendanceData 
    : [
        { name: "Mon", present: 0, absent: 0, late: 0 },
        { name: "Tue", present: 0, absent: 0, late: 0 },
        { name: "Wed", present: 0, absent: 0, late: 0 },
        { name: "Thu", present: 0, absent: 0, late: 0 },
        { name: "Fri", present: 0, absent: 0, late: 0 },
      ];

  const trendData = [
    { name: "W1", value: 90 },
    { name: "W2", value: 95 },
    { name: "W3", value: 85 },
    { name: "W4", value: 98 },
  ];

  const leaveData = [
    { name: "Paid", value: 12 },
    { name: "Sick", value: 5 },
    { name: "Casual", value: 3 },
  ];

  if (loading) return <div className="p-8 text-center text-text-muted">Loading dashboard...</div>;

  return (
    <PageWrapper>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-heading tracking-tight">Your Workspace</h1>
        <p className="text-text-muted text-sm mt-1">Monitor your personal progress and workforce status.</p>
        <div className="h-px bg-divider my-6"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card className="flex flex-col items-center text-center group">
            <div className="relative mb-4">
              <img
                src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name}&background=5b5bd6&color=fff`}
                alt={user?.name}
                className="w-20 h-20 rounded-2xl object-cover border border-border shadow-none group-hover:shadow-hover transition-all"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full ring-4 ring-white"></div>
            </div>
            <h2 className="text-lg font-bold text-text-heading">{user?.name}</h2>
            <p className="text-text-muted text-xs font-bold uppercase tracking-wider mt-1">{user?.designation}</p>
            
            <div className="mt-6 w-full">
              <Link to="/employee/profile" className="block w-full">
                <Button variant="secondary" className="w-full text-xs font-bold bg-transparent">Manage Profile</Button>
              </Link>
            </div>
          </Card>

          <Card title="Leave Utilization" subtitle="Annual allocation vs Consumption">
             <div className="h-[220px] w-full flex items-center justify-center">
                <LeaveChart data={leaveData} />
             </div>
             <div className="mt-4 pt-4 border-t border-divider flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-text-muted">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-surface border border-text-muted"></div>
                  <span>Allocated: 24</span>
                </div>
                <div className="flex items-center gap-1">
                   <span>Used: 20</span>
                   <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                </div>
             </div>
          </Card>
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="bg-surface rounded-2xl border border-primary/20 p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-primary-soft/30">
            <div>
              <h2 className="text-lg font-bold text-text-heading">Good Morning, {user?.name?.split(' ')[0] || 'Team'}</h2>
              <p className="text-text-muted text-xs mt-1 font-medium">There are no urgent action items for you today.</p>
            </div>
            <Link to="/employee/attendance">
              <Button size="sm">Clock In System</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <Card 
                key={idx} 
                title={stat.title} 
                icon={stat.icon} 
                iconClassName={stat.iconClass}
                accent={stat.accent}
                className="hover:border-primary/50 transition-colors"
               >
                 <div className="mt-2">
                   <p className="text-3xl font-bold text-text-heading tracking-tight">{stat.value}</p>
                 </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Weekly Productivity" subtitle="Projected work consistency breakdown">
              <AttendanceChart data={chartData} />
            </Card>
            <Card title="Growth Metric" subtitle="Performance health index trend">
               <TrendChart variant="line" data={trendData} dataKey="value" name="Engagement" />
            </Card>
          </div>

          <Card title="System Activity Log" subtitle="Real-time updates from HR management system">
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-divider last:border-0 last:pb-0">
                <div className="w-8 h-8 rounded-lg bg-background text-text-muted flex items-center justify-center shrink-0 border border-border">
                  <Activity size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-heading truncate">Logged In Successfully</p>
                  <p className="text-xs text-text-muted">Authentication verified from Session #4920</p>
                  <p className="text-[10px] text-text-muted font-bold uppercase mt-1">Today • 09:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-background text-text-muted flex items-center justify-center shrink-0 border border-border">
                  <FileText size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-text-heading truncate">October Payslip Released</p>
                  <p className="text-xs text-text-muted">A new document is available in your digital vault.</p>
                  <p className="text-[10px] text-text-muted font-bold uppercase mt-1">2 Days Ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EmployeeDashboard;
