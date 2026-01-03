import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield, 
  BookOpen, 
  Clock, 
  DollarSign, 
  Calendar, 
  FileText, 
  Info,
  ChevronRight,
  Search,
  ArrowRight,
  ExternalLink,
  Download
} from "lucide-react";
import { cn } from "../../utils/cn";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";

const PolicyCard = ({ policy, onClick }) => (
  <Card 
    className="group cursor-pointer hover:border-primary transition-all flex flex-col items-start h-full"
    onClick={() => onClick(policy)}
  >
    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-primary transition-colors mb-4">
      <policy.icon size={18} />
    </div>
    <h3 className="text-base font-bold text-primary mb-2">{policy.title}</h3>
    <p className="text-xs text-muted font-medium leading-relaxed line-clamp-2 mb-6">{policy.description}</p>
    
    <div className="mt-auto flex items-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
      Review Protocol <ArrowRight size={12} />
    </div>
  </Card>
);

const Policies = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [search, setSearch] = useState("");

  const policies = [
    {
      id: "leave",
      title: "Leave Policy",
      description: "Formal guidelines on time-off allocation, medical certification, and statutory holidays.",
      icon: Calendar,
      color: "bg-slate-50 text-primary",
      content: "Official procedure for leave applications... [Dossier Content]"
    },
    {
      id: "payroll",
      title: "Compensation & Benefits",
      description: "Structural definitions of remuneration, bonus cycles, and medical coverage.",
      icon: DollarSign,
      color: "bg-slate-50 text-primary",
      content: "Governance of salary disbursements... [Dossier Content]"
    },
    {
      id: "attendance",
      title: "Attendance Protocols",
      description: "Core operational hours, verification windows, and remote work compliance.",
      icon: Clock,
      color: "bg-slate-50 text-primary",
      content: "Operational availability requirements... [Dossier Content]"
    },
    {
      id: "conduct",
      title: "Code of Ethical Conduct",
      description: "Institutional values, professional behavioral standards, and anti-harassment policies.",
      icon: Shield,
      color: "bg-slate-50 text-primary",
      content: "Behavioral governance framework... [Dossier Content]"
    },
    {
      id: "it",
      title: "Information Security",
      description: "Regulatory compliance for hardware utilization and proprietary data protection.",
      icon: FileText,
      color: "bg-slate-50 text-primary",
      content: "Digital asset security protocols... [Dossier Content]"
    },
    {
      id: "handbook",
      title: "Employee Handbook",
      description: "Master administrative document governing employment life at DayFlow. Rev 2.4.",
      icon: BookOpen,
      color: "bg-slate-50 text-primary",
      content: "Complete administrative manual... [Dossier Content]"
    }
  ];

  const filteredPolicies = policies.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2 opacity-50">
            <Shield size={14} className="text-primary" />
            <span className="text-primary font-black tracking-[0.2em] text-[10px] uppercase">Compliance Center</span>
          </div>
          <h1 className="text-4xl font-black text-primary tracking-tighter">Institutional Policies</h1>
          <p className="text-muted text-sm mt-1 font-medium leading-relaxed">
            Formal documentation governing operational excellence and professional standards within DayFlow. 
          </p>
        </div>

        <div className="relative w-full md:w-80 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Filter by keyword..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all text-sm font-bold text-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="h-px bg-slate-100 mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPolicies.map((policy) => (
          <PolicyCard key={policy.id} policy={policy} onClick={setSelectedPolicy} />
        ))}
      </div>

      <div className="mt-12 p-8 bg-slate-50 rounded-xl border border-slate-100 flex flex-col md:flex-row items-center gap-8 shadow-subtle">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-200 shrink-0">
          <Info size={20} className="text-primary" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-base font-bold text-primary mb-1">Administrative Support</h3>
          <p className="text-xs text-muted font-medium">For specific inquiries regarding policy interpretation, please contact the Compliance Unit or file a formal clarification request.</p>
        </div>
        <Button variant="secondary" className="whitespace-nowrap px-8">
          Contact Compliance
        </Button>
      </div>

      <AnimatePresence>
        {selectedPolicy && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPolicy(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col border border-slate-200"
            >
              <div className="p-8 border-b border-slate-100">
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="info" className="mb-2">Official Protocol</Badge>
                    <h2 className="text-2xl font-black text-primary tracking-tight">{selectedPolicy.title}</h2>
                    <p className="text-[10px] text-muted font-black uppercase tracking-widest mt-1">Version: 2025.04 • Released: Dec 15, 2025</p>
                  </div>
                  <button onClick={() => setSelectedPolicy(null)} className="p-2 text-slate-300 hover:text-primary transition-colors">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>

              <div className="p-8 overflow-y-auto flex-1 space-y-8 bg-white">
                <section>
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest block mb-4">Abstract</label>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed">
                    {selectedPolicy.description}
                  </p>
                </section>
                
                <section className="space-y-4">
                  <label className="text-[10px] font-black text-muted uppercase tracking-widest block">Governing Clauses</label>
                  <div className="space-y-4 text-sm text-slate-600 font-medium leading-relaxed">
                    <p>Compliance is mandatory for all personnel under active service agreements. These clauses are designed to optimize organizational integrity and interpersonal professional standards.</p>
                    <ul className="list-disc pl-5 space-y-3">
                      <li>Personnel must adhere to the defined notification window.</li>
                      <li>Statutory documentation is required for all medical variances.</li>
                      <li>Non-compliance may lead to disciplinary review as per Article 4.</li>
                    </ul>
                  </div>
                </section>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 italic border-l-4 border-l-primary">
                  <p className="text-[11px] text-muted leading-relaxed font-medium">Disclaimer: This digital summary is for reference only. The notarized PDF remains the authoritative legal source of truth.</p>
                </div>
              </div>

              <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setSelectedPolicy(null)}>Dismiss</Button>
                <Button className="flex items-center gap-2">
                  <Download size={14} /> Download PDF Dossier
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Policies;
