import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import PayrollChart from "../../components/charts/PayrollChart";
import { PAYROLL } from "../../data/dummyData";
import { useAuth } from "../../context/AuthContext";
import { Download, PieChart as PieIcon, Clock, AlertTriangle, TrendingUp, Zap, Info } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

const EmployeePayroll = () => {
  const { user } = useAuth();
  const myPayroll = PAYROLL.filter(p => p.employeeId === user?.id);

  const salaryBreakdown = [
    { name: "Basic", value: user?.salary || 45000 },
    { name: "HRA (20%)", value: (user?.salary || 45000) * 0.2 },
    { name: "Allowances", value: 2000 },
    { name: "Deductions", value: 1500, color: '#EF4444' }
  ];

  return (
    <PageWrapper>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tighter">Compensation Ledger</h1>
          <p className="text-muted text-sm mt-1">Track disbursements, tax withholdings, and financial projections.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
             <Download size={16} /> Export Slips
          </Button>
          <Button className="flex items-center gap-2">
             Statement Analysis
          </Button>
        </div>
      </div>

      <div className="h-px bg-slate-100 mb-8"></div>

      {/* Formal Alert Branding */}
      <div className="mb-8 p-4 bg-error-soft border border-red-100 rounded-lg flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-error text-white rounded-lg">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-error-foreground">Payroll Variance Detected</h4>
            <p className="text-xs text-error-foreground opacity-70 truncate">Tax deductions for Dec 2025 exceed the standard deviation by $150. Immediate review recommended.</p>
          </div>
        </div>
        <button className="text-[10px] font-black text-error hover:underline uppercase tracking-widest bg-white px-3 py-1.5 rounded-md shadow-sm border border-red-50">Investigate</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2" title="Remuneration Component Breakdown" subtitle="Defined salary structure as per employment agreement">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-2">
                <div className="space-y-3">
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-muted text-xs font-bold uppercase tracking-tight">Basic Retainer</span>
                        <span className="text-sm font-bold text-primary">${user?.salary?.toLocaleString() || '0'}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-muted text-xs font-bold uppercase tracking-tight">HRA Allocation</span>
                        <span className="text-sm font-bold text-primary">${((user?.salary || 0) * 0.2).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-muted text-xs font-bold uppercase tracking-tight">Variables</span>
                        <span className="text-sm font-bold text-primary">$2,000</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-50 pb-2">
                        <span className="text-muted text-xs font-bold uppercase tracking-tight">Statutory Liabilities</span>
                        <span className="text-sm font-bold text-error">-$1,500</span>
                    </div>
                    <div className="flex justify-between pt-4">
                        <span className="text-sm font-black text-primary uppercase tracking-widest leading-none">Net Monthly Gross</span>
                        <span className="text-lg font-black text-primary">${((user?.salary || 0) * 1.2 + 2000).toLocaleString()}</span>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-slate-50/50 rounded-lg border border-slate-100 h-[300px] w-full">
                    <PayrollChart type="breakdown" data={salaryBreakdown} />
                </div>
            </div>
        </Card>

        <div className="space-y-6">
          <Card className="bg-primary group overflow-hidden relative border-none shadow-premium">
              <div className="relative z-10">
                  <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-widest mb-1">Estimated Next Payout</h3>
                  <p className="text-4xl font-black text-white tracking-tighter">${((user?.salary || 0) * 1.1).toLocaleString()}</p>
                  <div className="mt-8 flex items-center gap-3">
                      <div className="px-2 py-1 bg-white/10 rounded text-[9px] font-bold text-slate-300 uppercase letter tracking-widest border border-white/10">Cycle: Jan 01, 2026</div>
                      <div className="px-2 py-1 bg-success/20 text-success rounded text-[9px] font-bold uppercase tracking-widest border border-success/20 flex items-center gap-1">
                        <TrendingUp size={10}/> Verified
                      </div>
                  </div>
              </div>
              <PieIcon size={140} className="absolute -bottom-8 -right-8 text-white opacity-[0.03] rotate-12 group-hover:scale-110 transition-transform duration-700" />
          </Card>

          <Card title="AI Strategic Forecast" subtitle="Predictive bonus allocation">
            <div className="flex items-center gap-4 mt-2">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-slate-400">
                <Zap size={18} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-black text-primary tracking-tight">$2,450</p>
                <p className="text-[10px] text-muted font-bold uppercase tracking-widest">Q4 Performance Delta</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card title="Disbursement History" subtitle="Official record of previous fiscal period payments">
        <div className="overflow-hidden rounded-lg border border-slate-200 mt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-muted font-bold uppercase tracking-widest">
                <th className="py-4 px-6">Fiscal Month</th>
                <th className="py-4 px-6">Base Retainer</th>
                <th className="py-4 px-6">Variables</th>
                <th className="py-4 px-6">Liabilities</th>
                <th className="py-4 px-6">Net Disbursement</th>
                <th className="py-4 px-6">Verification</th>
                <th className="py-4 px-6 text-right">Documents</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myPayroll.map((pay, i) => (
                <tr key={pay.id} className={cn("hover:bg-slate-50/50 transition-colors", i % 2 !== 0 && "bg-slate-50/20")}>
                  <td className="py-4 px-6 text-sm font-bold text-primary">{pay.month}</td>
                  <td className="py-4 px-6 text-sm text-muted font-mono">${pay.basic.toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm text-muted font-mono">${pay.allowances.toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm text-error font-mono">-${pay.deductions.toLocaleString()}</td>
                  <td className="py-4 px-6 text-sm font-black text-success-foreground">${pay.netSalary.toLocaleString()}</td>
                  <td className="py-4 px-6">
                     <Badge variant="success">{pay.status}</Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                     <button className="p-2 text-primary hover:bg-slate-100 rounded-lg transition-all opacity-40 hover:opacity-100" title="Download Formal PDF">
                        <Download size={16} />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrapper>
  );
};

export default EmployeePayroll;
