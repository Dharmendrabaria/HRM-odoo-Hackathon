import { useState } from "react";
import { Zap, Rocket, CheckCircle2, Circle, LogOut, Package, Key, Monitor, FileText, Gift, Heart, UserMinus } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import { cn } from "../../utils/cn";
import { motion } from "framer-motion";

const Lifecycle = () => {
  const [activeTab, setActiveTab] = useState("onboarding");

  const onboardingSteps = [
    { id: 1, title: "Identity Validation", status: "completed", desc: "Upload ID and tax documentation" },
    { id: 2, title: "Hardware Provisions", status: "completed", desc: "Configuration of workstation and peripherals" },
    { id: 3, title: "Culture Immersion", status: "current", desc: "Welcome session with the Product team" },
    { id: 4, title: "Security Baseline", status: "upcoming", desc: "Complete mandatory cybersecurity training" },
    { id: 5, title: "Team Synergy", status: "upcoming", desc: "Introductory 1-on-1s with core members" },
  ];

  const offboardingTasks = [
    { id: 1, label: "Institutional Asset Return", category: "Hardware", status: "pending" },
    { id: 2, label: "Digital Access Revocation", category: "IT Security", status: "completed" },
    { id: 3, label: "Exit Interview Protocols", category: "HR", status: "pending" },
    { id: 4, label: "Knowledge Transfer Documentation", category: "Operational", status: "pending" },
    { id: 5, label: "Financial Clearance", category: "Accounts", status: "completed" },
  ];

  const currentStepIndex = onboardingSteps.findIndex(s => s.status === "current");
  const progressPercent = ((onboardingSteps.filter(s => s.status === "completed").length) / onboardingSteps.length) * 100;

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Personnel Lifecycle</h1>
          <p className="text-muted text-xs md:text-sm mt-0.5">Manage transitions from deployment to departure</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="secondary" size="md" className="w-full sm:w-auto">Protocol Manual</Button>
          <Button variant="primary" size="md" className="w-full sm:w-auto">Initiate Lifecycle</Button>
        </div>
      </div>

       {/* Tabs */}
       <div className="flex items-center gap-1 bg-soft p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("onboarding")}
          className={cn(
            "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2",
            activeTab === "onboarding" ? "bg-white text-primary shadow-sm" : "text-muted hover:text-foreground"
          )}
        >
          <Rocket size={14} /> Gamified Onboarding
        </button>
        <button
          onClick={() => setActiveTab("offboarding")}
          className={cn(
            "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2",
            activeTab === "offboarding" ? "bg-white text-primary shadow-sm" : "text-muted hover:text-foreground"
          )}
        >
          <LogOut size={14} /> Offboarding Protocols
        </button>
      </div>

      {activeTab === "onboarding" ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Left: Progress and Current Task */}
           <div className="lg:col-span-2 space-y-6">
              <Card accent="primary" className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full -rotate-90">
                              <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-soft" />
                              <circle 
                                cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                                strokeDasharray={364.4} strokeDashoffset={364.4 - (364.4 * progressPercent) / 100}
                                strokeLinecap="round" className="text-primary transition-all duration-1000" 
                              />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-2xl font-black text-foreground">{Math.round(progressPercent)}%</span>
                              <span className="text-[10px] font-bold text-muted uppercase">Ready</span>
                          </div>
                      </div>
                      <div className="text-center md:text-left">
                          <h2 className="text-2xl font-bold text-foreground">Welcome to the Team, Arjun!</h2>
                          <p className="text-muted text-sm mt-2 max-w-md">You're making great progress. Complete your security baseline training to unlock your <strong>"Cyber Guardian"</strong> badge.</p>
                          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
                             <Button size="sm" variant="primary">Resume Task</Button>
                             <Button size="sm" variant="ghost" className="text-xs font-bold uppercase underline">View Rewards</Button>
                          </div>
                      </div>
                  </div>
              </Card>

              <div className="space-y-4">
                  <h3 className="font-bold text-foreground px-1">Implementation Roadmap</h3>
                  {onboardingSteps.map((step, i) => (
                      <div key={step.id} className={cn(
                          "relative p-5 rounded-2xl border transition-all flex items-start gap-4",
                          step.status === "completed" ? "bg-success/5 border-success/10" : 
                          step.status === "current" ? "bg-white border-primary shadow-lg scale-[1.02] z-10" : 
                          "bg-soft/50 border-transparent opacity-60"
                      )}>
                          <div className={cn(
                              "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                              step.status === "completed" ? "bg-success text-white" : 
                              step.status === "current" ? "bg-primary text-white" : 
                              "bg-soft text-muted font-bold"
                          )}>
                              {step.status === "completed" ? <CheckCircle2 size={20} /> : <span>{step.id}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center gap-2">
                                <h4 className={cn("font-bold text-sm", step.status === "current" ? "text-primary" : "text-foreground")}>{step.title}</h4>
                                {step.status === "current" && <span className="flex h-2 w-2 rounded-full bg-primary animate-ping" />}
                              </div>
                              <p className="text-xs text-muted mt-1 truncate">{step.desc}</p>
                          </div>
                          {step.status === "current" && (
                            <Button size="sm" variant="ghost" className="text-[10px] font-black uppercase text-primary px-3 py-1 h-auto shrink-0">Start</Button>
                          )}
                      </div>
                  ))}
              </div>
           </div>

           {/* Right: Resources & Perks */}
           <div className="space-y-6">
              <Card title="Onboarding Kit" subtitle="Hardware & Software Access">
                 <div className="space-y-4 mt-4">
                    {[
                      { icon: Monitor, label: "MacBook Pro M3", status: "Dispatched" },
                      { icon: Key, label: "Digital Token ID", status: "Active" },
                      { icon: Package, label: "Welcome Merch", status: "Deliverd" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-soft/40 border border-slate-50">
                        <div className="flex items-center gap-3">
                          <item.icon size={16} className="text-muted" />
                          <span className="text-xs font-bold text-foreground">{item.label}</span>
                        </div>
                        <span className="text-[10px] font-black uppercase text-success tracking-widest">{item.status}</span>
                      </div>
                    ))}
                 </div>
              </Card>

              <Card accent="info" className="relative overflow-hidden group">
                  <Heart className="absolute -top-4 -right-4 w-24 h-24 text-info/10 group-hover:scale-125 transition-transform" />
                  <h4 className="font-bold text-foreground mb-1 relative z-10">Culture & Benefits</h4>
                  <p className="text-xs text-muted leading-relaxed relative z-10">Explore our health perks, gym memberships, and continuous learning funds.</p>
                  <Button size="sm" variant="ghost" className="mt-4 px-0 text-info font-bold text-xs h-auto relative z-10">Explore Perks →</Button>
              </Card>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Next Milestone</p>
                    <h4 className="text-lg font-bold mt-1">Founders Welcome</h4>
                    <p className="text-xs mt-2 opacity-90 leading-relaxed">Join the live session with our CEO on Monday at 9:00 AM.</p>
                    <div className="mt-6 flex items-center -space-x-2">
                       {[1,2,3,4].map(i => (
                         <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-8 h-8 rounded-full border-2 border-indigo-700" />
                       ))}
                       <div className="w-8 h-8 rounded-full bg-white/20 border-2 border-indigo-700 flex items-center justify-center text-[10px] font-bold">+12</div>
                    </div>
                  </div>
                  <Gift className="absolute top-4 right-4 w-12 h-12 opacity-20" />
              </div>
           </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="lg:col-span-3">
              <Card title="Offboarding Checklist" subtitle="Formal separation procedure documentation">
                  <div className="space-y-1 mt-6">
                    {offboardingTasks.map((task, i) => (
                      <div key={task.id} className="flex items-center justify-between p-4 rounded-xl hover:bg-soft transition-all group border-b border-border last:border-0">
                         <div className="flex items-center gap-4">
                            <button className={cn(
                              "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                              task.status === "completed" ? "bg-primary border-primary text-white" : "border-slate-300 bg-white"
                            )}>
                              {task.status === "completed" && <CheckCircle2 size={16} />}
                            </button>
                            <div className="min-w-0">
                              <p className={cn("text-sm font-bold", task.status === "completed" ? "text-muted line-through" : "text-foreground")}>{task.label}</p>
                              <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{task.category}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-4">
                            <Badge variant={task.status === "completed" ? "success" : "warning"}>{task.status}</Badge>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">Details</Button>
                         </div>
                      </div>
                    ))}
                  </div>
              </Card>
           </div>
           <div className="space-y-6">
              <Card accent="error" className="p-6">
                  <div className="p-3 bg-error/10 text-error rounded-xl w-fit mb-4">
                    <UserMinus size={24} />
                  </div>
                  <h4 className="font-bold text-foreground">Initiate Offboarding</h4>
                  <p className="text-xs text-muted mt-2 leading-relaxed">Required for voluntary resignations or contract terminations. This will trigger the global clearance workflow.</p>
                  <Button variant="danger" size="md" className="w-full mt-6 shadow-error/20">Purge Personnel Access</Button>
              </Card>
              <Card title="Exit Knowledge" subtitle="Handoff documentation">
                  <div className="p-4 rounded-xl bg-soft border border-dashed border-border flex flex-col items-center justify-center text-center">
                      <FileText size={32} className="text-muted mb-2" />
                      <p className="text-[10px] font-bold text-muted uppercase tracking-widest">No Documents Uploaded</p>
                      <Button variant="ghost" className="mt-4 text-xs font-bold text-primary px-0">Upload Handoff Docs</Button>
                  </div>
              </Card>
           </div>
        </div>
      )}
    </div>
  );
};

export default Lifecycle;
