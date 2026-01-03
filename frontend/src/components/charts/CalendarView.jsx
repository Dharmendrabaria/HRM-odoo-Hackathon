import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "../../utils/cn";

const CalendarView = ({ events = [], onDateClick, renderCell }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const nextMonth = () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">{format(currentDate, "MMMM yyyy")}</h2>
        <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ChevronLeft size={20} /></button>
            <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><ChevronRight size={20} /></button>
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 divide-x divide-y divide-gray-100">
        {days.map((day) => {
           const isCurrentMonth = isSameMonth(day, monthStart);
           const dayEvents = events.filter(e => isSameDay(new Date(e.date), day));
           
           return (
             <div 
                key={day.toString()} 
                onClick={() => onDateClick && onDateClick(day)}
                className={cn(
                    "min-h-[100px] p-2 transition-colors relative group",
                    !isCurrentMonth && "bg-gray-50/50 text-gray-400",
                    isCurrentMonth && "bg-white hover:bg-gray-50",
                    onDateClick && "cursor-pointer"
                )}
             >
                <span className={cn(
                    "text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-1",
                    isSameDay(day, new Date()) ? "bg-blue-600 text-white" : "text-gray-700"
                )}>
                    {format(day, "d")}
                </span>
                
                {/* Events */}
                <div className="space-y-1">
                    {renderCell ? renderCell(day, dayEvents) : dayEvents.map((e, i) => (
                        <div key={i} className="text-xs p-1 rounded bg-blue-100 text-blue-700 truncate">
                            {e.title}
                        </div>
                    ))}
                </div>
             </div>
           );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
