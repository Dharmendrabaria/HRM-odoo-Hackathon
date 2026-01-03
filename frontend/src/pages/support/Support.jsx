import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HelpCircle, 
  MessageSquare, 
  LifeBuoy, 
  Book, 
  Clock, 
  Search, 
  Plus,
  Send,
  User,
  CheckCircle2,
  AlertCircle,
  FileText,
  X
} from "lucide-react";
import { cn } from "../../utils/cn";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";

const TicketItem = ({ ticket, onClick }) => (
  <Card 
    className="group cursor-pointer hover:border-primary transition-all mb-4"
    onClick={() => onClick(ticket)}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <Badge variant={ticket.status === "open" ? "warning" : ticket.status === "resolved" ? "success" : "default"}>
          {ticket.status}
        </Badge>
        <span className="text-[10px] font-black text-muted uppercase tracking-widest">Case ID: {ticket.id}</span>
      </div>
      <span className="text-[10px] text-muted font-bold uppercase">{ticket.date}</span>
    </div>

    <h3 className="text-base font-bold text-primary mb-2 group-hover:underline decoration-slate-200 underline-offset-4">
      {ticket.subject}
    </h3>
    <p className="text-xs text-muted font-medium line-clamp-2 mb-6">
      {ticket.description}
    </p>

    <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
      <div className="flex -space-x-1">
        <img src="https://i.pravatar.cc/150?u=hr" className="w-6 h-6 rounded-md border border-white bg-slate-100" alt="HR" />
        <div className="w-6 h-6 rounded-md bg-slate-900 border border-white flex items-center justify-center text-[8px] font-black text-white">
          +1
        </div>
      </div>
      <span className="text-[10px] text-muted font-black uppercase tracking-widest opacity-60">Assigned to Compliance Team</span>
    </div>
  </Card>
);

const Support = () => {
  const [activeTab, setActiveTab] = useState("tickets");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const tickets = [
    {
      id: "TICK-8024",
      subject: "Tax Deduction Discrepancy",
      description: "My December salary slip shows a higher TDS deduction than usual. I need a breakdown of the calculation.",
      status: "open",
      date: "2 hours ago",
      category: "Payroll"
    },
    {
      id: "TICK-7982",
      subject: "Remote Work Reimbursement",
      description: "I haven't received the reimbursement for my home office setup expenses submitted last month.",
      status: "resolved",
      date: "3 days ago",
      category: "Benefits"
    },
    {
      id: "TICK-7945",
      subject: "Change of Emergency Contact",
      description: "Need to update my primary emergency contact details as my previous one is no longer available.",
      status: "closed",
      date: "1 week ago",
      category: "Profile"
    }
  ];

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2 opacity-50">
            <LifeBuoy size={14} className="text-primary" />
            <span className="text-primary font-black tracking-[0.2em] text-[10px] uppercase">Service Desk</span>
          </div>
          <h1 className="text-4xl font-black text-primary tracking-tighter">Support & Assistance</h1>
          <p className="text-muted text-sm mt-1 font-medium leading-relaxed">
            Formal resolution center for institutional inquiries, technical anomalies, and documentation assistance.
          </p>
        </div>

        <Button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2"
        >
          <Plus size={16} /> Open New Inquiry
        </Button>
      </div>

      <div className="h-px bg-slate-100 mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <nav className="flex flex-col gap-1">
            <button 
              onClick={() => setActiveTab("tickets")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all text-left",
                activeTab === "tickets" ? "bg-primary text-white shadow-premium" : "text-muted hover:bg-slate-50 hover:text-primary"
              )}
            >
              <MessageSquare size={14} /> My Active Inquiries
            </button>
            <button 
              onClick={() => setActiveTab("faq")}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all text-left",
                activeTab === "faq" ? "bg-primary text-white shadow-premium" : "text-muted hover:bg-slate-50 hover:text-primary"
              )}
            >
              <Book size={14} /> Knowledge Archive
            </button>
            <button 
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[11px] font-black uppercase tracking-widest text-muted hover:bg-slate-50 hover:text-primary transition-all text-left"
            >
              <FileText size={14} /> Documentation
            </button>
          </nav>

          <Card title="Crisis Protocol" subtitle="Immediate assistance required" className="bg-slate-100 border-none">
            <p className="text-[10px] text-muted font-medium mb-4">Our Compliance Officers are during standard operating hours for real-time resolution.</p>
            <Button variant="outline" className="w-full bg-white border-none shadow-subtle hover:bg-slate-50">
              Initialize Synchronous Chat
            </Button>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === "tickets" ? (
              <motion.div
                key="tickets"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                {tickets.map((ticket) => (
                  <TicketItem key={ticket.id} ticket={ticket} onClick={setSelectedTicket} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="space-y-4"
              >
                {[1,2,3,4].map((i) => (
                   <Card key={i} title="How do I request a formal attendance correction?" subtitle="Procedural Guideline">
                     <p className="text-xs text-muted font-medium leading-relaxed mt-2 italic">Official Directive: Navigate to the Attendance Ledger, select the chronometric variance, and execute 'Adjustment Request'. Your assigned supervisor must notarize the change.</p>
                   </Card>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Create Ticket Modal */}
      <AnimatePresence>
        {isCreating && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreating(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <Badge variant="info" className="mb-2">New Submission</Badge>
                    <h2 className="text-2xl font-black text-primary tracking-tight">Formal Inquiry</h2>
                </div>
                <button onClick={() => setIsCreating(false)} className="text-slate-300 hover:text-primary transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">Inquiry Abstract (Subject)</label>
                  <input 
                    type="text" 
                    placeholder="Clear, concise declaration of the issue..."
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all text-sm font-bold text-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">Procedural Classification</label>
                  <select className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all text-sm font-bold text-primary">
                    <option>Structural Compensation & Benefits</option>
                    <option>Attendance & Leave Compliance</option>
                    <option>Asset & Technological Infrastructure</option>
                    <option>Personnel Meta-data Correction</option>
                    <option>General Administrative Clause</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest">Detailed Context (Description)</label>
                  <textarea 
                    rows={4}
                    placeholder="Explicitly detail the circumstances requiring intervention..."
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all text-sm font-medium text-primary"
                  />
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <Button 
                  variant="secondary"
                  onClick={() => setIsCreating(false)}
                >
                  Discard
                </Button>
                <Button className="flex items-center gap-2">
                  Submit to Queue <Send size={14} />
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Support;
