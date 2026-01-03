import React from "react";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  ChevronDown, 
  Mail, 
  Phone, 
  MoreVertical,
  ShieldCheck,
  Star
} from "lucide-react";
import { cn } from "../../utils/cn";

const OrgNode = ({ person, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const hasSubordinates = person.subordinates && person.subordinates.length > 0;

  return (
    <div className="flex flex-col">
      <div className="flex items-center group">
        {depth > 0 && (
          <div className="w-8 h-px bg-slate-200 -ml-8 mr-0" />
        )}
        
        <div 
          className={cn(
            "relative flex items-center gap-4 p-4 min-w-[320px] bg-white rounded-lg border border-slate-200 shadow-subtle hover:border-primary hover:shadow-premium transition-all",
            depth === 0 && "border-2 border-primary ring-4 ring-slate-900/5 shadow-premium"
          )}
        >
          <div className="relative">
            <img 
              src={person.avatar || `https://ui-avatars.com/api/?name=${person.name}&background=0f172a&color=fff`} 
              alt={person.name} 
              className="w-12 h-12 rounded-lg object-cover border border-slate-100 shadow-sm" 
            />
            {depth === 0 && (
              <div className="absolute -top-1.5 -right-1.5 p-1 bg-primary rounded-lg shadow-sm">
                <ShieldCheck size={12} className="text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-primary truncate leading-tight">{person.name}</h4>
              <button className="p-1 text-slate-300 hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical size={14} />
              </button>
            </div>
            <p className="text-[10px] font-black text-muted uppercase tracking-widest mt-0.5 mt-1">{person.role}</p>
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-50">
              <div className="px-1.5 py-0.5 rounded bg-slate-50 text-[9px] font-black text-muted uppercase tracking-widest border border-slate-100">
                {person.department}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted font-bold truncate">
                <Mail size={12} className="opacity-40" />
                <span className="truncate">{person.email}</span>
              </div>
            </div>
          </div>

          {hasSubordinates && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center shadow-subtle hover:border-primary hover:text-primary transition-colors z-20"
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>
          )}
        </div>
      </div>

      {isExpanded && hasSubordinates && (
        <div className="relative pl-12 mt-6 space-y-6">
          <div className="absolute left-[20px] top-0 bottom-6 w-px bg-slate-200" />
          
          {person.subordinates.map((sub, idx) => (
            <OrgNode key={idx} person={sub} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const OrgChart = () => {
  const dummyData = {
    name: "Vikram Singh",
    role: "Chief Executive Officer",
    department: "Executive",
    email: "vikram@dayflow.io",
    subordinates: [
      {
        name: "Neha Sharma",
        role: "Head of Operations",
        department: "Ops",
        email: "neha@dayflow.io",
        subordinates: [
          { name: "Rahul Verma", role: "Logistics Manager", department: "Ops", email: "rahul@dayflow.io" },
          { name: "Sanya Gupta", role: "Supply Chain Manager", department: "Ops", email: "sanya@dayflow.io" }
        ]
      },
      {
        name: "Arjun Reddy",
        role: "Chief Technology Officer",
        department: "Engineering",
        email: "arjun@dayflow.io",
        subordinates: [
          { 
            name: "Priya Das", 
            role: "Engineering Manager", 
            department: "Engineering", 
            email: "priya@dayflow.io",
            subordinates: [
              { name: "Amit Kumar", role: "Software Architect", department: "Engineering", email: "amit@dayflow.io" },
              { name: "Kiran Shah", role: "Frontend Lead", department: "Engineering", email: "kiran@dayflow.io" }
            ]
          }
        ]
      },
      {
        name: "Deepa Mehta",
        role: "HR Director",
        department: "HR",
        email: "deepa@dayflow.io"
      }
    ]
  };

  return (
    <div className="p-8 overflow-x-auto min-h-[600px] no-scrollbar">
      <div className="inline-block py-12">
        <OrgNode person={dummyData} />
      </div>
    </div>
  );
};

export default OrgChart;
