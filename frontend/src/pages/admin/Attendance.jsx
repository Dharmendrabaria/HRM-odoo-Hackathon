import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import { ATTENDANCE, USERS } from "../../data/dummyData";
import { Search, Calendar, Filter } from "lucide-react";
import { cn } from "../../utils/cn";

const AdminAttendance = () => {
  const attendanceWithNames = ATTENDANCE.map(record => {
    const emp = USERS.find(u => u.id === record.employeeId);
    return { ...record, name: emp?.name || record.employeeId, avatar: emp?.avatar };
  });

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Attendance Ledger</h1>
          <p className="text-muted text-xs md:text-sm mt-0.5">Real-time organizational presence tracking</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative group w-full sm:w-auto">
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted group-focus-within:text-primary transition-colors" />
              <input type="date" className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-xs font-bold text-foreground outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-subtle" />
            </div>
            <select className="w-full sm:w-auto px-4 py-2 bg-white border border-border rounded-lg text-xs font-bold text-foreground outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all shadow-subtle min-w-[180px]">
                <option>Filter by Unit: All</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>HR</option>
            </select>
        </div>
      </div>

      <Card title="Attendance Records" subtitle="Daily personnel logs" className="overflow-x-auto shadow-subtle border-border">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-muted uppercase tracking-widest">
                <th className="py-4 px-6">Personnel</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Clock-In</th>
                <th className="py-4 px-6">Clock-Out</th>
                <th className="py-4 px-6 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendanceWithNames.map((record, i) => (
                <tr key={record.id} className={cn("hover:bg-slate-50/50 transition-colors", i % 2 !== 0 && "bg-slate-50/20")}>
                  <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                          <img src={record.avatar || `https://ui-avatars.com/api/?name=${record.name}&background=0f172a&color=fff`} alt="" className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-100" />
                          <span className="text-sm font-bold text-primary">{record.name}</span>
                      </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-primary font-bold">{record.date}</td>
                  <td className="py-4 px-6 text-sm text-muted font-mono">{record.checkIn}</td>
                  <td className="py-4 px-6 text-sm text-muted font-mono">{record.checkOut}</td>
                  <td className="py-4 px-6 text-right">
                    <Badge variant={record.status === "Present" ? "success" : record.status === "Absent" ? "danger" : "warning"}>
                      {record.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminAttendance;
