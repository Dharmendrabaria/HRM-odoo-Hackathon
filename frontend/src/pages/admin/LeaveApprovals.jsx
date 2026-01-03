import { useState } from "react";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import { LEAVES, USERS } from "../../data/dummyData";
import { Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import { cn } from "../../utils/cn";

const AdminLeaveApprovals = () => {
  const [leaves, setLeaves] = useState(LEAVES.map(l => {
      const emp = USERS.find(u => u.id === l.employeeId);
      return { ...l, name: emp?.name, avatar: emp?.avatar };
  }));

  const handleAction = (id, status) => {
      setLeaves(leaves.map(l => l.id === id ? { ...l, status } : l));
  };

  return (
    <PageWrapper>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-4xl font-black text-primary tracking-tighter">Absence Approvals</h1>
          <p className="text-muted text-sm mt-1 font-medium">Review and enact decisions on personnel time-off requests.</p>
        </div>
        <div className="flex gap-3">
            <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-primary outline-none focus:ring-2 focus:ring-slate-900/5 focus:border-slate-900 transition-all shadow-subtle min-w-[200px]">
                <option>Filter by Status: All Requests</option>
                <option>Pending Validation</option>
                <option>Approved History</option>
                <option>Rejected Records</option>
            </select>
        </div>
      </div>

      <div className="h-px bg-slate-100 mb-8"></div>

      <div className="grid grid-cols-1 gap-4">
          {leaves.map((leave) => (
              <Card key={leave.id} className="flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-primary transition-all">
                  <div className="flex items-start gap-4">
                      <div className="relative">
                        <img src={leave.avatar || `https://ui-avatars.com/api/?name=${leave.name}&background=0f172a&color=fff`} alt="" className="w-12 h-12 rounded-lg border border-slate-100 bg-slate-50" />
                        {leave.status === "Pending" && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning ring-2 ring-white rounded-full"></div>
                        )}
                      </div>
                      <div className="min-w-0">
                          <h3 className="text-sm font-bold text-primary group-hover:underline underline-offset-2 decoration-slate-200">{leave.name}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-black text-muted uppercase tracking-widest">{leave.type}</span>
                            <div className="flex items-center gap-1.5 text-[10px] text-primary font-bold bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-md">
                                <Calendar size={10} className="text-slate-400" />
                                {leave.from} — {leave.to}
                            </div>
                          </div>
                          {leave.remarks && (
                            <p className="text-xs text-muted font-medium mt-3 italic leading-relaxed border-l-2 border-slate-100 pl-3">“{leave.remarks}”</p>
                          )}
                      </div>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-slate-50">
                      {leave.status === "Pending" ? (
                          <>
                            <Button variant="secondary" className="flex items-center gap-2 text-error hover:bg-error-soft hover:border-error/20" onClick={() => handleAction(leave.id, "Rejected")}>
                                <XCircle size={14} /> Reject
                            </Button>
                            <Button className="flex items-center gap-2" onClick={() => handleAction(leave.id, "Approved")}>
                                <CheckCircle2 size={14} /> Approve Request
                            </Button>
                          </>
                      ) : (
                        <div className="flex flex-col items-end gap-1">
                            <Badge variant={leave.status === "Approved" ? "success" : "danger"}>
                                {leave.status === "Approved" ? "Formal Approval" : "Request Denied"}
                            </Badge>
                            <span className="text-[9px] font-black text-muted uppercase tracking-widest">Decision Enacted</span>
                        </div>
                      )}
                  </div>
              </Card>
          ))}
      </div>
    </PageWrapper>
  );
};

export default AdminLeaveApprovals;
