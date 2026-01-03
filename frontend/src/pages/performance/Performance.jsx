import { useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Target, Award, Star, TrendingUp, Zap, MessageSquare, CheckCircle2, Shield, Clock, CheckSquare } from "lucide-react";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

const Performance = () => {
  const [activeTab, setActiveTab] = useState("okrs");

  const okrData = [
    { id: 1, objective: "Complete React Backend Integration", progress: 65, status: "In Progress", kr: "Integrate 5/8 core modules" },
    { id: 2, objective: "Improve App Load Time by 40%", progress: 90, status: "Near Completion", kr: "Achieve <1.2s LCP" },
    { id: 3, objective: "Onboard 50 New Enterprise Clients", progress: 30, status: "Behind", kr: "Signed 15/50 contracts" },
  ];

  const skillData = [
    { subject: 'Coding', A: 120, B: 110, fullMark: 150 },
    { subject: 'Design', A: 98, B: 130, fullMark: 150 },
    { subject: 'Strategy', A: 86, B: 130, fullMark: 150 },
    { subject: 'Soft Skills', A: 99, B: 100, fullMark: 150 },
    { subject: 'Product', A: 85, B: 90, fullMark: 150 },
    { subject: 'Leadership', A: 65, B: 85, fullMark: 150 },
  ];

  const feedbackData = [
    { user: "Sarah Chen", role: "Product Manager", type: "Praise", text: "Exceptional work on the data visualization module. The interactive elements were a game changer.", date: "2 days ago" },
    { user: "Michael Ross", role: "Lead Designer", type: "Constructive", text: "The UI scaling on ultra-wide monitors needs a bit more attention, but overall great polish.", date: "1 week ago" },
    { user: "James Wilson", role: "CTO", type: "Praise", text: "Consistently delivering high-quality code ahead of schedule. Great leadership during the sprint.", date: "2 weeks ago" },
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Performance & OKRs</h1>
          <p className="text-muted text-xs md:text-sm mt-0.5">Track growth, objectives, and team synergies</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="secondary" size="md" className="flex-1 sm:flex-none">Download Report</Button>
          <Button variant="primary" size="md" className="flex-1 sm:flex-none">New Objective</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-soft p-1 rounded-xl w-fit">
        {["okrs", "feedback", "skills"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all",
              activeTab === tab ? "bg-white text-primary shadow-sm" : "text-muted hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: OKRs or Feedback */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "okrs" && (
            <div className="space-y-4">
              {okrData.map((okr) => (
                <Card key={okr.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
                        <Target size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">{okr.objective}</h3>
                        <p className="text-sm text-muted mt-1">Key Result: <span className="font-semibold text-foreground">{okr.kr}</span></p>
                      </div>
                    </div>
                    <Badge variant={okr.status === "Behind" ? "error" : okr.status === "Near Completion" ? "success" : "info"}>
                      {okr.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted">
                      <span>Completion Status</span>
                      <span className="text-primary">{okr.progress}%</span>
                    </div>
                    <div className="h-2 bg-soft rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${okr.progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={cn(
                          "h-full rounded-full",
                          okr.progress > 80 ? "bg-success" : okr.progress > 40 ? "bg-primary" : "bg-warning"
                        )}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-4">
              {feedbackData.map((fb, idx) => (
                <Card key={idx} className="p-6 hover:shadow-lift transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-soft border-2 border-white shadow-sm flex items-center justify-center font-bold text-primary shrink-0">
                      {fb.user[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-foreground">{fb.user}</h4>
                          <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{fb.role}</p>
                        </div>
                        <Badge variant={fb.type === "Praise" ? "success" : "warning"} dot>
                          {fb.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted leading-relaxed">"{fb.text}"</p>
                      <p className="text-[10px] text-muted font-medium mt-3 flex items-center gap-1">
                        <Clock size={10} /> {fb.date}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
              <Button variant="ghost" className="w-full py-4 border-2 border-dashed border-border rounded-2xl text-muted hover:border-primary/20 hover:text-primary transition-all">
                <MessageSquare size={18} />
                <span>Request Feedback from Peers</span>
              </Button>
            </div>
          )}

          {activeTab === "skills" && (
            <Card title="Skill Matrix Breakdown" subtitle="Departmental competency levels">
               <div className="h-[400px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#475569", fontSize: 12, fontWeight: 600 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                      <Radar
                        name="Mike"
                        dataKey="A"
                        stroke="#4f46e5"
                        fill="#4f46e5"
                        fillOpacity={0.6}
                      />
                      <Radar
                        name="Team Average"
                        dataKey="B"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
               </div>
            </Card>
          )}
        </div>

        {/* Right Column: Stats & Highlights */}
        <div className="space-y-6">
          <Card accent="primary">
            <h4 className="font-bold text-foreground mb-4">Performance Score</h4>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-black text-primary">9.2</span>
              <span className="text-muted font-bold text-sm mb-1.5">/ 10</span>
            </div>
            <p className="text-xs text-muted mt-4 leading-relaxed">Your performance is in the <strong>top 5%</strong> of the engineering department this quarter.</p>
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-muted uppercase tracking-widest">Growth Path</span>
                <span className="text-success text-xs font-bold">+12% vs last Q</span>
              </div>
              <div className="h-1.5 bg-soft rounded-full overflow-hidden">
                <div className="w-[92%] h-full bg-primary rounded-full" />
              </div>
            </div>
          </Card>

          <Card title="Badges & Awards" subtitle="Recent recognition">
             <div className="grid grid-cols-2 gap-3 mt-4">
                {[
                  { icon: Zap, label: "Fast Mover", color: "bg-amber-50 text-amber-600" },
                  { icon: Shield, label: "Core Guard", color: "bg-blue-50 text-blue-600" },
                  { icon: Star, label: "Star Performer", color: "bg-purple-50 text-purple-600" },
                  { icon: Award, label: "Sprint MVP", color: "bg-emerald-50 text-emerald-600" },
                ].map((badge, i) => (
                  <div key={i} className={cn("p-4 rounded-2xl flex flex-col items-center gap-2 text-center", badge.color)}>
                    <badge.icon size={24} />
                    <span className="text-[10px] font-black uppercase tracking-wider">{badge.label}</span>
                  </div>
                ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Performance;
