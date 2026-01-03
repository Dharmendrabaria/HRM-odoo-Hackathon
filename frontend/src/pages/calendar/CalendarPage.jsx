import { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, MapPin, Users, Plus, CheckCircle2, AlertCircle } from "lucide-react";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import { cn } from "../../utils/cn";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("team");

  // Mock data for team events
  const teamEvents = [
    { day: 12, type: "Leave", user: "Sarah Chen", color: "bg-amber-500" },
    { day: 15, type: "Birthday", user: "James Wilson", color: "bg-indigo-500" },
    { day: 15, type: "Anniversary", user: "Vikram Singh", color: "bg-emerald-500" },
    { day: 22, type: "Leave", user: "Deepa Mehta", color: "bg-amber-500" },
  ];

  // Mock data for meeting rooms
  const meetingRooms = [
    { id: 1, name: "The War Room", capacity: 12, status: "Available", features: ["TV", "Whitedboard", "Video Conference"] },
    { id: 2, name: "Quiet Zone", capacity: 4, status: "Occupied", until: "14:30", features: ["Privacy Glass"] },
    { id: 3, name: "Innovation Lab", capacity: 20, status: "Available", features: ["Projector", "Modular Seating"] },
    { id: 4, name: "Coffee Corner", capacity: 6, status: "Available", features: ["Couch", "Coffee Machine"] },
  ];

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const days = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Schedule & Resources</h1>
          <p className="text-muted text-xs md:text-sm mt-0.5">Manage team availability and workspace booking</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="primary" size="md" className="w-full sm:w-auto">
            <Plus size={18} />
            <span>Create Booking</span>
          </Button>
        </div>
      </div>

       {/* Tabs */}
       <div className="flex items-center gap-1 bg-soft p-1 rounded-xl w-fit">
        <button
          onClick={() => setActiveTab("team")}
          className={cn(
            "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2",
            activeTab === "team" ? "bg-white text-primary shadow-sm" : "text-muted hover:text-foreground"
          )}
        >
          <Users size={14} /> Team Calendar
        </button>
        <button
          onClick={() => setActiveTab("rooms")}
          className={cn(
            "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2",
            activeTab === "rooms" ? "bg-white text-primary shadow-sm" : "text-muted hover:text-foreground"
          )}
        >
          <MapPin size={14} /> Meeting Rooms
        </button>
      </div>

      {activeTab === "team" ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar Grid */}
          <Card className="lg:col-span-3 p-0 overflow-hidden">
            <div className="p-4 md:p-6 border-b border-border flex items-center justify-between bg-soft/30">
              <h3 className="font-bold text-lg text-foreground">{monthNames[month]} {year}</h3>
              <div className="flex gap-2">
                <button onClick={() => setCurrentDate(new Date(year, month - 1))} className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-border"><ChevronLeft size={18} /></button>
                <button onClick={() => setCurrentDate(new Date())} className="px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary hover:bg-white rounded-lg border border-transparent hover:border-border">Today</button>
                <button onClick={() => setCurrentDate(new Date(year, month + 1))} className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-border"><ChevronRight size={18} /></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 border-b border-border bg-soft/10">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d} className="py-3 text-center text-[10px] font-black uppercase tracking-widest text-muted border-r border-border last:border-0">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 border-l border-border">
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`empty-${i}`} className="h-24 md:h-32 border-r border-b border-border bg-soft/5" />
              ))}
              {Array.from({ length: days }).map((_, i) => {
                const day = i + 1;
                const events = teamEvents.filter(e => e.day === day);
                const isToday = day === new Date().getDate() && month === new Date().getMonth();

                return (
                  <div key={day} className={cn(
                    "h-24 md:h-32 border-r border-b border-border p-2 md:p-3 hover:bg-soft/20 transition-colors relative group",
                    isToday && "bg-primary/5"
                  )}>
                    <span className={cn(
                      "text-xs font-bold inline-flex items-center justify-center w-6 h-6 rounded-lg",
                      isToday ? "bg-primary text-white" : "text-muted group-hover:text-foreground"
                    )}>
                      {day}
                    </span>
                    <div className="mt-2 space-y-1 overflow-hidden">
                      {events.map((e, idx) => (
                        <div key={idx} className={cn(
                          "px-1.5 py-0.5 rounded text-[10px] font-bold text-white truncate",
                          e.color
                        )}>
                          {e.type[0]}: {e.user.split(' ')[0]}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Upcomming Events Sidebar */}
          <div className="space-y-6">
            <Card title="Upcoming Highlights" subtitle="Events in the next 14 days">
               <div className="space-y-4 mt-4">
                 {teamEvents.map((e, i) => (
                   <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-soft/50 hover:bg-soft transition-colors border border-transparent hover:border-border group">
                      <div className={cn("w-2 h-10 rounded-full shrink-0", e.color)} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h4 className="text-sm font-bold text-foreground truncate">{e.user}</h4>
                          <span className="text-[10px] font-black text-muted uppercase">{monthNames[month].slice(0,3)} {e.day}</span>
                        </div>
                        <p className="text-[11px] text-muted mt-0.5">{e.type}</p>
                      </div>
                   </div>
                 ))}
               </div>
               <div className="mt-6 p-4 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm"><AlertCircle size={18} /></div>
                  <p className="text-[10px] text-indigo-700 font-medium leading-relaxed">Don't forget to send a gift card to <strong>James</strong> for his Work Anniversary!</p>
               </div>
            </Card>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetingRooms.map((room) => (
            <Card key={room.id} className="group hover:shadow-lift transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={cn(
                    "p-3 rounded-xl",
                    room.status === "Available" ? "bg-success/10 text-success" : "bg-error/10 text-error"
                  )}>
                    <MapPin size={24} />
                  </div>
                  <Badge variant={room.status === "Available" ? "success" : "error"} dot>
                    {room.status}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{room.name}</h3>
                <p className="text-xs text-muted flex items-center gap-1 mt-1 font-medium">
                  <Users size={12} /> Up to {room.capacity} people
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {room.features.map(f => (
                    <span key={f} className="px-2 py-1 bg-soft rounded-lg text-[10px] font-bold text-muted uppercase tracking-wider">{f}</span>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  {room.status === "Occupied" ? (
                    <div className="flex items-center gap-1.5 text-xs text-muted font-medium">
                      <Clock size={14} /> Busy until {room.until}
                    </div>
                  ) : (
                    <div className="text-xs text-success font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={14} /> Open to book
                    </div>
                  )}
                  <Button variant={room.status === "Available" ? "primary" : "secondary"} size="sm" disabled={room.status === "Occupied"}>
                    {room.status === "Available" ? "Book Now" : "Request Hub"}
                  </Button>
                </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
