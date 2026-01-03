import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import { NOTIFICATIONS } from "../../data/dummyData";
import { useAuth } from "../../context/AuthContext";
import { Bell, CheckCircle, Info, AlertTriangle, ShieldCheck } from "lucide-react";
import Button from "../../components/common/Button";
import { cn } from "../../utils/cn";

const AdminNotifications = () => {
  const { user } = useAuth();
  // Ensure we have a consistent set of notifications for the demo if user is null
  const fallbackUserId = 1; 
  const currentUserId = user?.id || fallbackUserId;
  const myNotifications = NOTIFICATIONS.filter(n => n.userId === currentUserId);

  return (
    <PageWrapper>
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h1 className="text-4xl font-black text-primary tracking-tighter">Communication Ledger</h1>
          <p className="text-muted text-sm mt-1 font-medium leading-relaxed">System-wide operational alerts and personnel action logs.</p>
        </div>
        <div className="flex gap-3">
            <Button variant="secondary" className="text-xs font-black uppercase tracking-widest px-6">Mark All as Acknowledged</Button>
        </div>
      </div>

      <div className="h-px bg-slate-100 mb-8"></div>

      <div className="space-y-3 max-w-4xl">
        {myNotifications.length > 0 ? (
          myNotifications.map((note, i) => (
            <Card key={note.id} className={cn(
                "flex gap-4 p-4 border-l-4 transition-all hover:bg-slate-50 group",
                !note.read ? 'border-l-primary bg-slate-50/50' : 'border-l-slate-200'
            )}>
              <div className={cn(
                  "p-2.5 rounded-lg h-fit flex-shrink-0 border",
                  !note.read ? 'bg-white text-primary border-slate-200 shadow-sm' : 'bg-slate-50 text-slate-300 border-transparent'
              )}>
                <Bell size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    {!note.read && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary ring-4 ring-slate-900/5"></div>
                    )}
                    <span className="text-[10px] font-black text-muted uppercase tracking-widest leading-none">Operational Internal Log</span>
                </div>
                <p className={cn(
                    "text-sm font-medium leading-relaxed",
                    !note.read ? 'text-primary font-bold' : 'text-slate-500'
                )}>{note.message}</p>
                <p className="text-[10px] text-muted font-bold mt-2 uppercase tracking-tight">{note.date}</p>
              </div>
              {!note.read && (
                 <button className="p-2 text-slate-300 hover:text-success transition-colors opacity-0 group-hover:opacity-100" title="Acknowledge">
                    <CheckCircle size={18} />
                 </button>
              )}
            </Card>
          ))
        ) : (
          <div className="text-center py-32 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
             <div className="w-16 h-16 bg-white rounded-xl shadow-subtle border border-slate-100 flex items-center justify-center mx-auto mb-6 text-slate-200">
                <ShieldCheck size={32} />
             </div>
             <h3 className="text-base font-bold text-primary mb-1">System Equilibrium</h3>
             <p className="text-xs text-muted font-medium">All operational notifications have been duly processed and acknowledged.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default AdminNotifications;
