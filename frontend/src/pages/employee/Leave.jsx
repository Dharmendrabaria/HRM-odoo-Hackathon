import { useState, useEffect } from "react";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Badge from "../../components/common/Badge";
import Modal from "../../components/common/Modal";
import LeaveChart from "../../components/charts/LeaveChart";
import TrendChart from "../../components/charts/TrendChart";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Plus, BarChart2, Users, Search, AlertTriangle, Calendar as CalendarIcon, Info, ArrowUpRight } from "lucide-react";
import { differenceInBusinessDays, parseISO, format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";
import api from "../../services/api";

const EmployeeLeave = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newLeave, setNewLeave] = useState({ 
    leaveType: "paid", 
    startDate: "", 
    endDate: "", 
    reason: "", 
    isHalfDay: false 
  });

  // Fetch leaves on component mount
  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/leaves/my-leaves');
      if (data.success) {
        setLeaves(data.data);
      }
    } catch (error) {
      console.error('Error fetching leaves:', error);
      addToast('Failed to load leave history', 'error');
    } finally {
      setLoading(false);
    }
  };

  const leaveDistribution = [
    { name: "Paid", value: user?.leaveBalance?.paid || 12 },
    { name: "Sick", value: user?.leaveBalance?.sick || 7 },
    { name: "Casual", value: user?.leaveBalance?.casual || 5 },
    { name: "Unpaid", value: user?.leaveBalance?.unpaid || 0 },
  ];

  const leaveTrend = [
    { name: "Jan", value: 1 },
    { name: "Feb", value: 0 },
    { name: "Mar", value: 3 },
    { name: "Apr", value: 2 },
    { name: "May", value: 1 },
    { name: "Jun", value: 4 },
  ];

  const handleApply = async (e) => {
    e.preventDefault();
    
    if (new Date(newLeave.startDate) > new Date(newLeave.endDate) && !newLeave.isHalfDay) {
        addToast("End date cannot be before start date", "error");
        return;
    }

    if (!newLeave.reason.trim()) {
        addToast("Please provide a reason for leave", "error");
        return;
    }

    try {
      setSubmitting(true);
      
      const leaveData = {
        leaveType: newLeave.leaveType,
        startDate: newLeave.startDate,
        endDate: newLeave.isHalfDay ? newLeave.startDate : newLeave.endDate,
        reason: newLeave.reason
      };

      const { data } = await api.post('/leaves', leaveData);
      
      if (data.success) {
        addToast("Leave request submitted successfully", "success");
        setIsModalOpen(false);
        setNewLeave({ leaveType: "paid", startDate: "", endDate: "", reason: "", isHalfDay: false });
        fetchLeaves(); // Refresh the list
      }
    } catch (error) {
      console.error('Error applying for leave:', error);
      const errorMsg = error.response?.data?.message || "Failed to submit leave request";
      addToast(errorMsg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = async (id) => {
      if(window.confirm("Are you sure you want to cancel this request?")) {
          try {
            await api.delete(`/leaves/${id}`);
            addToast("Leave request cancelled", "info");
            fetchLeaves();
          } catch (error) {
            console.error('Error cancelling leave:', error);
            const errorMsg = error.response?.data?.message || "Failed to cancel leave";
            addToast(errorMsg, "error");
          }
      }
  }

  const calculateDays = (from, to, isHalf) => {
      if(isHalf) return 0.5;
      if(!from || !to) return 0;
      const days = differenceInBusinessDays(parseISO(to), parseISO(from)) + 1;
      return Math.max(0, days);
  }

  const formatDate = (dateString) => {
    try {
      return format(parseISO(dateString), 'yyyy-MM-dd');
    } catch {
      return dateString;
    }
  }

  return (
    <PageWrapper>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary tracking-tighter">Time Off Center</h1>
          <p className="text-muted text-sm mt-1">Submit leave requests and track your annual allocation.</p>
        </div>
        <Button 
            className="flex items-center gap-2" 
            onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} /> Request Time Off
        </Button>
      </div>

      <div className="h-px bg-slate-100 mb-8"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "Annual Leave", value: "12 / 18", color: "border-l-primary" },
          { label: "Medical Leave", value: "5 / 7", color: "border-l-error" },
          { label: "Personal Leave", value: "3 / 5", color: "border-l-warning" },
          { label: "Carry Forward", value: "5 Days", color: "border-l-success" },
        ].map((stat, i) => (
          <Card key={i} className={cn("border-l-4", stat.color)}>
            <p className="text-muted text-[10px] font-black uppercase tracking-widest leading-none mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-primary tracking-tight">{stat.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 space-y-6">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Consumption Trend" subtitle="Monthly utilization of business days">
                  <div className="h-[200px]">
                    <TrendChart variant="area" data={leaveTrend} dataKey="value" name="Leaves Used" />
                  </div>
              </Card>
              <Card title="Distribution" subtitle="Breakdown of allocation types used">
                  <div className="h-[200px]">
                    <LeaveChart data={leaveDistribution} />
                  </div>
              </Card>
           </div>
        </div>

        <Card title="Team Insight" subtitle="Collaborators unavailable this period">
          <div className="space-y-4">
            {[
              { name: "Rahul Verma", role: "Manager", status: "On Leave", avatar: "1" },
              { name: "Sanya Gupta", role: "Designer", status: "Half Day", avatar: "2" },
              { name: "Amit Kumar", role: "Developer", status: "WFH", avatar: "3" },
            ].map((member, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-colors">
                <img src={`https://i.pravatar.cc/150?u=${member.avatar}`} className="w-8 h-8 rounded-lg" alt="" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-primary truncate">{member.name}</h4>
                  <p className="text-[10px] text-muted font-bold uppercase">{member.role}</p>
                </div>
                <Badge variant={member.status === "On Leave" ? "danger" : member.status === "Half Day" ? "warning" : "info"}>
                  {member.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Request Ledger" subtitle="Formal log of all submitted time-off documentation">
        <div className="overflow-hidden rounded-lg border border-slate-200 mt-2">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] text-muted font-bold uppercase tracking-widest">
                <th className="py-4 px-6">Leave Variant</th>
                <th className="py-4 px-6">Date Range</th>
                <th className="py-4 px-6">Quantity</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                  <tr>
                      <td colSpan="5" className="py-12 text-center text-muted">Loading...</td>
                  </tr>
              ) : leaves.length === 0 ? (
                  <tr>
                      <td colSpan="5" className="py-12 text-center text-muted italic">No leave history found</td>
                  </tr>
              ) : leaves.map((leave, i) => {
                const leaveTypeMap = {
                  'paid': 'Annual Leave',
                  'sick': 'Medical Leave',
                  'casual': 'Personal Leave',
                  'unpaid': 'Unpaid Leave'
                };
                const statusMap = {
                  'pending': 'Pending',
                  'approved': 'Approved',
                  'rejected': 'Rejected'
                };
                return (
                <tr key={leave._id} className={cn("hover:bg-slate-50/50 transition-colors", i % 2 !== 0 && "bg-slate-50/20")}>
                  <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-primary capitalize">{leaveTypeMap[leave.leaveType] || leave.leaveType}</span>
                      </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-muted font-mono">
                      {formatDate(leave.startDate)} {formatDate(leave.startDate) !== formatDate(leave.endDate) && `— ${formatDate(leave.endDate)}`}
                  </td>
                  <td className="py-4 px-6 text-sm font-bold text-primary">
                      {calculateDays(formatDate(leave.startDate), formatDate(leave.endDate), false)} Days
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={leave.status === "approved" ? "success" : leave.status === "rejected" ? "danger" : "warning"}>
                      {statusMap[leave.status] || leave.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                      {leave.status === "pending" ? (
                          <button 
                            className="text-[10px] font-black text-error hover:underline uppercase tracking-widest"
                            onClick={() => handleCancel(leave._id)}
                          >
                               Void Request
                          </button>
                      ) : (
                        <span className="text-[10px] font-black text-muted uppercase tracking-widest opacity-30">Archive</span>
                      )}
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Formal Leave Request">
        <form onSubmit={handleApply} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[11px] font-black text-muted uppercase tracking-widest">Type of Documentation</label>
            <select
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-primary outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                value={newLeave.leaveType}
                onChange={(e) => setNewLeave({...newLeave, leaveType: e.target.value})}
            >
                <option value="paid">Annual Leave (AL)</option>
                <option value="sick">Medical Certificate (MC)</option>
                <option value="casual">Personal Leave (PL)</option>
                <option value="unpaid">Unpaid Absence (UA)</option>
            </select>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100">
              <input 
                type="checkbox" 
                id="halfDay" 
                checked={newLeave.isHalfDay} 
                onChange={(e) => setNewLeave({...newLeave, isHalfDay: e.target.checked})}
                className="w-4 h-4 rounded-md border-slate-300 text-primary focus:ring-primary"
              />
              <label htmlFor="halfDay" className="text-xs font-bold text-primary cursor-pointer">Register as Partial (Half) Day Absence</label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
                label={newLeave.isHalfDay ? "Selected Date" : "Start Date"} 
                type="date" 
                value={newLeave.startDate} 
                onChange={(e) => setNewLeave({...newLeave, startDate: e.target.value})}
                required 
            />
            {!newLeave.isHalfDay && (
                <Input 
                    label="End Date" 
                    type="date" 
                    value={newLeave.endDate} 
                    onChange={(e) => setNewLeave({...newLeave, endDate: e.target.value})}
                    required 
                />
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-[11px] font-black text-muted uppercase tracking-widest">Reason for Leave</label>
            <textarea
                className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-primary outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all min-h-[100px]"
                value={newLeave.reason}
                onChange={(e) => setNewLeave({...newLeave, reason: e.target.value})}
                placeholder="Provide reason for leave request..."
                required
            ></textarea>
          </div>

          {(newLeave.startDate && (newLeave.endDate || newLeave.isHalfDay)) && (
            <div className="space-y-3">
              <div className="p-4 bg-slate-900 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-slate-400" />
                    <div>
                      <span className="block text-[10px] text-slate-500 font-black uppercase tracking-widest">Duration</span>
                      <span className="text-sm font-bold text-white">
                        {calculateDays(newLeave.startDate, newLeave.isHalfDay ? newLeave.startDate : newLeave.endDate, newLeave.isHalfDay)} Business Days
                      </span>
                    </div>
                  </div>
              </div>

              <div className="p-4 bg-warning-soft rounded-lg border border-amber-100">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning shrink-0" />
                  <div>
                    <h5 className="text-[11px] font-black text-warning-foreground uppercase tracking-widest">Important Notice</h5>
                    <p className="text-[11px] text-warning-foreground mt-1 leading-tight opacity-70">
                      Your leave request will be sent to your manager for approval. Please ensure all pending work is completed or delegated.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end gap-3">
             <Button variant="secondary" type="button" onClick={() => setIsModalOpen(false)} disabled={submitting}>Cancel</Button>
             <Button type="submit" disabled={submitting}>
               {submitting ? "Submitting..." : "Submit Request"}
             </Button>
          </div>
        </form>
      </Modal>
    </PageWrapper>
  );
};

export default EmployeeLeave;
