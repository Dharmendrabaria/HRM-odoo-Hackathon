import { useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import AttendanceChart from "../../components/charts/AttendanceChart";
import DepartmentChart from "../../components/charts/DepartmentChart";
import LeaveChart from "../../components/charts/LeaveChart";
import PayrollChart from "../../components/charts/PayrollChart";
import TrendChart from "../../components/charts/TrendChart";
import { FileText, Download, Filter, Calendar as CalIcon, Users, Briefcase, TrendingUp } from "lucide-react";
import { cn } from "../../utils/cn";

const AdminReports = () => {
  const [filters, setFilters] = useState({
      startDate: "2023-10-01",
      endDate: "2023-10-31",
      department: "All",
      reportType: "Attendance"
  });

  const attendanceTrend = [
      { name: "Week 1", present: 42, late: 3, absent: 0 },
      { name: "Week 2", present: 40, late: 4, absent: 1 },
      { name: "Week 3", present: 44, late: 1, absent: 0 },
      { name: "Week 4", present: 43, late: 2, absent: 0 },
  ];

  const deptHiring = [
      { name: "Eng", value: 12 },
      { name: "Design", value: 5 },
      { name: "Sales", value: 8 },
      { name: "HR", value: 3 },
  ];

  const leaveTypes = [
      { name: "Paid", value: 30 },
      { name: "Sick", value: 12 },
      { name: "Casual", value: 8 },
      { name: "Unpaid", value: 5 },
  ];

  const expenseData = [
      { name: "Jun", value: 120000 },
      { name: "Jul", value: 125000 },
      { name: "Aug", value: 122000 },
      { name: "Sep", value: 130000 },
      { name: "Oct", value: 145000 },
  ];

  const handleExport = (format) => {
      alert(`Exporting analytical dossier as ${format}...`);
  };

  return (
    <PageWrapper>
      <div className="mb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
          <h1 className="text-4xl font-black text-primary tracking-tighter">Institutional Analytics</h1>
          <p className="text-muted text-sm mt-1 font-medium leading-relaxed">System-wide data intelligence and strategic workforce reporting engine.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="secondary" className="flex items-center gap-2" onClick={() => handleExport('PDF')}>
                <FileText size={14} /> Export Dossier (PDF)
            </Button>
            <Button className="flex items-center gap-2" onClick={() => handleExport('CSV')}>
                <Download size={14} /> Export Raw Data (CSV)
            </Button>
        </div>
      </div>

      <div className="h-px bg-slate-100 mb-8"></div>

      <Card className="mb-8 border-slate-200 shadow-subtle bg-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
              <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest block">Functional Unit</label>
                  <select 
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-primary outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all shadow-subtle"
                    value={filters.department}
                    onChange={(e) => setFilters({...filters, department: e.target.value})}
                  >
                      <option>All Divisions</option>
                      <option>Engineering</option>
                      <option>Product & Creative</option>
                      <option>Human Resources</option>
                  </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest block">Commencement Date</label>
                <div className="relative">
                  <CalIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="date" 
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-primary focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none"
                    value={filters.startDate}
                    onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted uppercase tracking-widest block">Termination Date</label>
                <div className="relative">
                  <CalIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                  <input 
                    type="date" 
                    className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-primary focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all outline-none"
                    value={filters.endDate}
                    onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                  />
                </div>
              </div>
              <Button variant="secondary" className="flex items-center justify-center gap-2 py-3">
                  <Filter size={14} /> Refresh Analytics
              </Button>
          </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <Card 
            title="Attendance Reliability Index" 
            subtitle="Frequency distribution across the selected chronometric range"
            className="lg:col-span-8"
          >
              <div className="h-[300px] mt-4">
                <AttendanceChart data={attendanceTrend} metrics={['present', 'late', 'absent']} />
              </div>
          </Card>
          
          <Card 
            title="Absence Allocation" 
            subtitle="Classification of personnel downtime"
            className="lg:col-span-4"
          >
              <div className="h-[300px] mt-4">
                <LeaveChart data={leaveTypes} />
              </div>
          </Card>

          <Card 
            title="Fiscal Trajectory" 
            subtitle="Longitudinal analysis of human capital investment"
            className="lg:col-span-4"
          >
               <div className="h-[300px] mt-4">
                <TrendChart variant="area" data={expenseData} dataKey="value" name="Total Expenditure" />
               </div>
          </Card>

          <Card 
            title="Structural Expansion" 
            subtitle="Institutional growth and intake per unit"
            className="lg:col-span-8"
          >
               <div className="h-[300px] mt-4">
                <DepartmentChart data={deptHiring} keys={['value']} layout="vertical" />
               </div>
          </Card>
      </div>

      <div className="mt-8">
          <Card title="Automated Regulatory Reporting" subtitle="Pre-notarized reporting modules for statutory compliance">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  {[
                      { title: "Statutory Compliance", icon: Briefcase },
                      { title: "Fiscal Summary", icon: TrendingUp },
                      { title: "Personnel Performance", icon: Users },
                      { title: "Asset Inventory", icon: FileText }
                  ].map((rep, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-lg hover:border-primary hover:bg-white transition-all cursor-pointer group flex items-start gap-4">
                          <div className="p-2.5 rounded-lg bg-white border border-slate-100 text-slate-400 group-hover:text-primary transition-colors">
                              <rep.icon size={18} />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-primary text-xs leading-tight mb-1">{rep.title}</h4>
                            <p className="text-[10px] text-muted font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Generate Dossier →</p>
                          </div>
                      </div>
                  ))}
              </div>
          </Card>
      </div>
    </PageWrapper>
  );
};

export default AdminReports;
