import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import PayrollChart from "../../components/charts/PayrollChart";
import DepartmentChart from "../../components/charts/DepartmentChart";
import TrendChart from "../../components/charts/TrendChart";
import { PAYROLL, USERS } from "../../data/dummyData";
import { Edit2, Download, DollarSign, PieChart as PieIcon, TrendingUp, Filter } from "lucide-react";
import { cn } from "../../utils/cn";

const AdminPayroll = () => {
  const payrollData = PAYROLL.map(p => {
      const emp = USERS.find(u => u.id === p.employeeId);
      return { ...p, name: emp?.name, dept: emp?.department };
  });

  const payrollTrend = [  
    { name: "May", value: 125000 },
    { name: "Jun", value: 128000 },
    { name: "Jul", value: 132000 },
    { name: "Aug", value: 135000 },
    { name: "Sep", value: 141500 },
    { name: "Oct", value: 145000 },
  ];

  const deptSalaries = [
    { name: "Engineering", value: 65000 },
    { name: "Design", value: 35000 },
    { name: "Marketing", value: 25000 },
    { name: "HR", value: 16500 },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Payroll Management</h1>
          <p className="text-muted text-xs md:text-sm mt-0.5">Automated organizational disbursements</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
                <Download size={16}/> <span>Export Report</span>
            </Button>
            <Button variant="primary" size="md" className="w-full sm:w-auto">Run Global Payroll</Button>
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
         <Card accent="success">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-success/10 text-success rounded-lg">
                  <DollarSign size={24}/>
                </div>
            </div>
            <div>
               <p className="text-sm font-medium text-muted mb-1">Total Disbursed (Oct)</p>
               <p className="text-3xl font-bold text-foreground">$141,500</p>
            </div>
         </Card>
         <Card accent="warning">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-warning/10 text-warning rounded-lg">
                  <PieIcon size={24}/>
                </div>
            </div>
            <div>
               <p className="text-sm font-medium text-muted mb-1">Pending Review</p>
               <p className="text-3xl font-bold text-foreground">5</p>
            </div>
         </Card>
         <Card accent="primary">
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-primary/10 text-primary rounded-lg">
                  <TrendingUp size={24}/>
                </div>
                <Badge variant="success" dot>+2.4%</Badge>
            </div>
            <div>
               <p className="text-sm font-medium text-muted mb-1">Monthly Growth</p>
               <p className="text-3xl font-bold text-foreground">Optimized</p>
            </div>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card title="Operational Expense Curve" subtitle="Longitudinal growth of human capital expenditure" className="lg:col-span-2">
              <div className="h-[280px] mt-4">
                <TrendChart variant="area" data={payrollTrend} dataKey="value" name="Institutional Outflow" />
              </div>
          </Card>
          <Card title="Unit Cost Allocation" subtitle="Structural average disbursement per functional team">
              <div className="h-[280px] mt-4">
                <DepartmentChart data={deptSalaries} keys={['value']} />
              </div>
          </Card>
      </div>

      <Card title="Payroll Register" subtitle="Personnel disbursement logs">
        <div className="overflow-x-auto rounded-lg border border-slate-200 mt-4">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-muted font-bold uppercase tracking-widest">
                <th className="py-4 px-6">Personnel Identifier</th>
                <th className="py-4 px-6">Functional Unit</th>
                <th className="py-4 px-6 text-right">Base Retainer</th>
                <th className="py-4 px-6 text-right">Net Disbursement</th>
                <th className="py-4 px-6 text-center">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payrollData.map((record, i) => (
                <tr key={record.id} className={cn("hover:bg-slate-50/50 transition-colors", i % 2 !== 0 && "bg-slate-50/20")}>
                  <td className="py-4 px-6">
                      <p className="text-sm font-bold text-primary">{record.name}</p>
                      <p className="text-[10px] text-muted font-black uppercase tracking-widest">ID: #{record.id}</p>
                  </td>
                  <td className="py-4 px-6">
                      <span className="text-[10px] font-black text-muted uppercase tracking-widest">{record.dept}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-muted font-mono text-right">${record.basic.toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm font-black text-primary text-right">${record.netSalary.toLocaleString()}</td>
                  <td className="py-4 px-6 text-center">
                     <Badge variant={record.status === "Paid" ? "success" : "warning"}>
                        {record.status}
                     </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                     <div className="flex justify-end gap-1">
                        <button className="p-2 text-slate-300 hover:text-primary transition-all" title="Adjust Structure">
                            <Edit2 size={14} />
                        </button>
                        <button className="p-2 text-slate-300 hover:text-primary transition-all" title="Export Documentation">
                            <Download size={14} />
                        </button>
                     </div>
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

export default AdminPayroll;
