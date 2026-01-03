import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import AttendanceChart from "../../components/charts/AttendanceChart";
import DepartmentChart from "../../components/charts/DepartmentChart";
import LeaveChart from "../../components/charts/LeaveChart";
import TrendChart from "../../components/charts/TrendChart";
import { USERS, ATTENDANCE, LEAVES } from "../../data/dummyData";
import { Users, Clock, Calendar, CheckCircle, TrendingUp, Briefcase, UserPlus, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";

const AdminDashboard = () => {
  const totalEmployees = USERS.filter(u => u.role === "employee").length;
  const presentToday = 42;
  const pendingLeaves = LEAVES.filter(l => l.status === "Pending").length;

  const stats = [
    { 
      title: "Employees", 
      value: totalEmployees, 
      icon: Users, 
      change: "+12%",
      trend: "up",
      color: "primary"
    },
    { 
      title: "Present", 
      value: `${presentToday}/45`, 
      icon: Clock, 
      change: "+5%",
      trend: "up",
      color: "success"
    },
    { 
      title: "Pending", 
      value: pendingLeaves, 
      icon: Calendar, 
      change: "-3",
      trend: "down",
      color: "warning"
    },
    { 
      title: "Projects", 
      value: "12", 
      icon: Briefcase, 
      change: "+2",
      trend: "up",
      color: "info"
    },
  ];

  const companyAttendanceTrend = [
    { name: "Mon", present: 43, late: 2 },
    { name: "Tue", present: 41, late: 4 },
    { name: "Wed", present: 44, late: 1 },
    { name: "Thu", present: 42, late: 3 },
    { name: "Fri", present: 45, late: 0 },
    { name: "Sat", present: 38, late: 2 },
  ];

  const deptAttendance = [
    { name: "Eng", onTime: 18, late: 2 },
    { name: "Design", onTime: 8, late: 1 },
    { name: "Prod", onTime: 5, late: 0 },
    { name: "HR", onTime: 3, late: 1 },
  ];

  const leaveRequestData = [
    { name: "Approved", value: 45 },
    { name: "Pending", value: 8 },
    { name: "Rejected", value: 3 },
  ];

  const employeeGrowth = [
    { name: "Jan", value: 30 },
    { name: "Feb", value: 32 },
    { name: "Mar", value: 35 },
    { name: "Apr", value: 38 },
    { name: "May", value: 42 },
    { name: "Jun", value: 45 },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-text-heading">Overview</h1>
          <p className="text-text-muted text-xs md:text-sm mt-0.5">Real-time organizational insights</p>
        </div>
        <Link to="/admin/onboarding" className="w-full sm:w-auto">
          <Button variant="primary" className="w-full sm:w-auto shadow-none">
            <UserPlus size={18} />
            <span className="sm:inline">Add Personnel</span>
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="hover:shadow-hover transition-all p-4 md:p-6" accent={stat.color}>
              <div className="flex items-start justify-between">
                <div className={cn(
                  "p-2.5 rounded-xl",
                  stat.color === "primary" && "bg-primary-soft text-primary",
                  stat.color === "success" && "bg-success-soft text-success",
                  stat.color === "warning" && "bg-warning-soft text-warning",
                  stat.color === "info" && "bg-info-soft text-info"
                )}>
                  <stat.icon size={22} className="md:w-6 md:h-6" />
                </div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] md:text-xs font-bold px-2 py-1 rounded-full",
                  stat.trend === "up" ? "bg-success-soft text-success" : "bg-error-soft text-error"
                )}>
                  {stat.trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs md:text-sm font-medium text-text-muted">{stat.title}</p>
                <p className="text-xl md:text-2xl lg:text-3xl font-bold text-text-heading mt-0.5">{stat.value}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Attendance Performance" subtitle="Weekly distribution" accent="info" className="lg:col-span-2">
          <div className="h-[280px] md:h-[320px] w-full mt-4">
            <AttendanceChart data={companyAttendanceTrend} metrics={['present', 'late']} />
          </div>
        </Card>
        <Card title="Request Status" subtitle="Leave cycle distribution" accent="warning">
          <div className="h-[280px] md:h-[320px] w-full mt-4 flex justify-center">
            <LeaveChart data={leaveRequestData} />
          </div>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Workforce Growth" subtitle="Net headcount trajectory" accent="success">
          <div className="h-[280px] md:h-[320px] w-full mt-4">
            <TrendChart variant="area" data={employeeGrowth} dataKey="value" name="PersonnelCount" />
          </div>
        </Card>
        <Card title="Team Engagement" subtitle="Functional unit metrics" accent="primary">
          <div className="h-[280px] md:h-[320px] w-full mt-4">
            <DepartmentChart data={deptAttendance} keys={['onTime', 'late']} />
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Recent Personnel Actions" subtitle="Audit activity feed" className="lg:col-span-2 overflow-hidden">
          <div className="space-y-1 mt-2 -mx-2">
            {[
              { user: "Deepa Mehta", action: "Recalibrated payroll matrix", time: "12m", icon: Briefcase, status: "success" },
              { user: "Vikram Singh", action: "Authorized leave protocols", time: "1h", icon: CheckCircle, status: "success" },
              { user: "System Engine", action: "Synchronized fiscal data", time: "3h", icon: Activity, status: "info" },
            ].map((log, i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4 p-3 rounded-xl hover:bg-surface-hover transition-all group">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110",
                  log.status === "success" && "bg-success-soft text-success",
                  log.status === "info" && "bg-info-soft text-info"
                )}>
                  <log.icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-text-heading text-sm truncate">{log.user}</h4>
                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider shrink-0">{log.time} AGO</span>
                  </div>
                  <p className="text-xs text-text-muted mt-0.5 truncate leading-relaxed">{log.action}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-center">
            <Button variant="ghost" size="sm" className="text-xs font-bold uppercase tracking-widest text-primary">
              View Detailed Audit Log
            </Button>
          </div>
        </Card>
        
        <Card title="Operational KPIs" subtitle="Snapshot metrics">
          <div className="space-y-3 mt-4">
            {[
              { label: "Efficiency Index", value: "94.2%", status: "success" },
              { label: "Retention Rate", value: "88.5%", status: "success" },
              { label: "Pending Reviews", value: "05 Tasks", status: "warning" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-xl bg-background border border-border hover:border-primary/20 transition-colors group">
                <span className="text-xs md:text-sm font-bold text-text-muted group-hover:text-text-heading transition-colors">{item.label}</span>
                <Badge variant={item.status} dot>{item.value}</Badge>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-2xl bg-primary-soft border border-primary/10 relative overflow-hidden group">
            <div className="relative z-10">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">System Intelligence</p>
              <p className="text-[11px] text-text-muted mt-2 leading-relaxed">Organizational health is currently <strong>Optimal</strong> based on active metrics.</p>
            </div>
            <Activity className="absolute -bottom-2 -right-2 text-primary/10 w-16 h-16 group-hover:scale-125 transition-transform" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
