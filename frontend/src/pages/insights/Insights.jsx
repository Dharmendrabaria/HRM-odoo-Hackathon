import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Zap, 
  Target, 
  BarChart3, 
  PieChart, 
  Calendar,
  Sparkles,
  ArrowUpRight,
  Clock,
  Briefcase
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Cell
} from "recharts";
import { cn } from "../../utils/cn";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";

const InsightCard = ({ title, value, subtext, trend, icon: Icon, color }) => (
  <Card className="group hover:border-slate-300 transition-all">
    <div className="flex items-start justify-between">
      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-primary transition-colors">
        <Icon size={18} />
      </div>
      {trend && (
        <Badge variant={trend > 0 ? "success" : "danger"}>
          {trend > 0 ? '+' : ''}{trend}%
        </Badge>
      )}
    </div>

    <div className="mt-4">
      <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-1">{title}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-primary tracking-tight">{value}</span>
        <span className="text-[10px] font-bold text-slate-300 uppercase">{subtext}</span>
      </div>
    </div>
  </Card>
);

const Insights = () => {
  const chartData = [
    { name: "Mon", attendance: 92, efficiency: 85 },
    { name: "Tue", attendance: 95, efficiency: 88 },
    { name: "Wed", attendance: 88, efficiency: 82 },
    { name: "Thu", attendance: 98, efficiency: 94 },
    { name: "Fri", attendance: 94, efficiency: 90 },
    { name: "Sat", attendance: 85, efficiency: 75 },
    { name: "Sun", attendance: 0, efficiency: 0 },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1 opacity-50">
            <Sparkles size={14} className="text-primary" />
            <span className="text-primary font-black tracking-[0.2em] text-[10px] uppercase">Intelligence Engine</span>
          </div>
          <h1 className="text-4xl font-black text-primary tracking-tighter">Strategic Insights</h1>
          <p className="text-muted text-sm mt-1 font-medium">Visualizing institutional productivity and attendance patterns.</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="secondary" className="flex items-center gap-2">
            <Calendar size={16} /> Reporting Cycle: Dec 2025
          </Button>
          <Button>Export Analytical Summary</Button>
        </div>
      </div>

      <div className="h-px bg-slate-100 my-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <InsightCard 
          title="Attendance Score" 
          value="94.2%" 
          subtext="Net Yield" 
          trend={12} 
          icon={Clock} 
        />
        <InsightCard 
          title="Leave Index" 
          value="High Variance" 
          subtext="Seasonality Alert" 
          icon={Calendar} 
        />
        <InsightCard 
          title="Fiscal Health" 
          value="Optimized" 
          subtext="Verified" 
          trend={2.4} 
          icon={Zap} 
        />
        <InsightCard 
          title="Unit Efficiency" 
          value="88.0" 
          subtext="Index / 100" 
          trend={-3} 
          icon={Target} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card 
          title="Workforce Activity Matrix" 
          subtitle="Longitudinal analysis of attendance vs efficiency parameters"
          className="lg:col-span-2"
        >
          <div className="h-[350px] w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#64748b', fontWeight: 700 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '8px', 
                    border: '1px solid #e2e8f0', 
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    backgroundColor: '#fff',
                    color: '#0f172a'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="attendance" 
                  stroke="#0f172a" 
                  strokeWidth={2}
                  fillOpacity={0.05} 
                  fill="#0f172a" 
                />
                <Area 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#64748b" 
                  strokeWidth={2}
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex items-center gap-6 border-t border-slate-50 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded bg-primary" />
                <span className="text-[10px] font-black text-muted uppercase tracking-widest">Attendance Yield</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded bg-slate-400" />
                <span className="text-[10px] font-black text-muted uppercase tracking-widest">Efficiency Index</span>
              </div>
            </div>
        </Card>

        <Card title="Predictive Analysis" subtitle="Algorithmic workforce projection" className="bg-primary border-none shadow-premium text-white">
          <div className="relative z-10 flex flex-col h-full justify-between mt-4">
            <div>
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-6 border border-white/10">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-2">Quarterly Forecast</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-8">
                Historical data indicates an 82% probability of departmental leave synchronization during the second fiscal week of January. 
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Confidence Interval</span>
                  <span className="text-xs font-bold">82.4%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Risk Mitigation</span>
                  <span className="text-xs font-bold text-success font-mono">SAFE</span>
                </div>
              </div>
            </div>

            <Button variant="secondary" className="w-full bg-white text-primary border-none hover:bg-slate-50 mt-auto">
              Simulate Leave Impact
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Variance Detection" subtitle="Anomalous behavioral patterns">
          <div className="space-y-4 mt-2">
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-primary">Late Engagement</span>
                <Badge variant="danger">High</Badge>
              </div>
              <p className="text-[11px] text-muted leading-relaxed">3 identified instances in current cycle. Mean arrival delay: <span className="text-primary font-bold">14.2m</span>.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-primary">Logging Continuity</span>
                <Badge variant="warning">Monitor</Badge>
              </div>
              <p className="text-[11px] text-muted leading-relaxed">Multiple break-time documentation gaps detected in functional logs.</p>
            </div>
          </div>
        </Card>

        <Card title="Cycle Metadata" subtitle="Current period summaries">
          <div className="space-y-6 mt-4">
             <div className="space-y-2">
                <div className="flex justify-between items-end">
                   <p className="text-[10px] font-black text-muted uppercase tracking-widest">Attendance Yield</p>
                   <span className="text-xs font-bold text-primary">22 / 24 Days</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-primary h-full w-[91%]" />
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between items-end">
                   <p className="text-[10px] font-black text-muted uppercase tracking-widest">Leave Consumption</p>
                   <span className="text-xs font-bold text-primary">2.0 Days</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-amber-400 h-full w-[15%]" />
                </div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between items-end">
                   <p className="text-[10px] font-black text-muted uppercase tracking-widest">Efficiency Baseline</p>
                   <span className="text-xs font-bold text-primary">88.0%</span>
                </div>
                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-success h-full w-[88%]" />
                </div>
             </div>
          </div>
        </Card>

        <div className="bg-slate-100 rounded-xl p-8 flex flex-col justify-between border border-slate-200 group cursor-pointer hover:bg-slate-200 transition-colors">
          <div>
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-6 shadow-subtle border border-slate-200">
              <PieChart size={18} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-primary mb-2">Formal Performance Review (PDF)</h3>
            <p className="text-muted text-xs leading-relaxed">Generate a notarized analytical dossier encompassing attendance, payroll components, and efficiency metrics.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-black text-primary uppercase tracking-widest mt-8">
            Initialize Export <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
