import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import PageWrapper from "../../components/layout/PageWrapper";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import { Clock, Calendar, CheckCircle, XCircle, LogIn, LogOut, TrendingUp } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO } from "date-fns";
import api from "../../services/api";
import { cn } from "../../utils/cn";

const EmployeeAttendance = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [stats, setStats] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    fetchTodayAttendance();
    fetchAttendanceHistory();
  }, [currentMonth]);

  const fetchTodayAttendance = async () => {
    try {
      const { data } = await api.get('/attendance/today');
      setTodayAttendance(data.data);
    } catch (error) {
      console.error('Error fetching today attendance:', error);
    }
  };

  const fetchAttendanceHistory = async () => {
    try {
      setLoading(true);
      const month = currentMonth.getMonth() + 1;
      const year = currentMonth.getFullYear();
      
      const { data } = await api.get(`/attendance/my-attendance?month=${month}&year=${year}`);
      
      if (data.success) {
        setAttendanceHistory(data.data);
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
      addToast('Failed to load attendance history', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      setCheckingIn(true);
      const { data } = await api.post('/attendance/check-in', {
        location: 'Office'
      });
      
      if (data.success) {
        addToast('Checked in successfully!', 'success');
        fetchTodayAttendance();
        fetchAttendanceHistory();
      }
    } catch (error) {
      console.error('Check-in error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to check in';
      addToast(errorMsg, 'error');
    } finally {
      setCheckingIn(false);
    }
  };

  const handleCheckOut = async () => {
    try {
      setCheckingOut(true);
      const { data } = await api.post('/attendance/check-out');
      
      if (data.success) {
        addToast('Checked out successfully!', 'success');
        fetchTodayAttendance();
        fetchAttendanceHistory();
      }
    } catch (error) {
      console.error('Check-out error:', error);
      const errorMsg = error.response?.data?.message || 'Failed to check out';
      addToast(errorMsg, 'error');
    } finally {
      setCheckingOut(false);
    }
  };

  const getAttendanceForDate = (date) => {
    return attendanceHistory.find(a => 
      isSameDay(parseISO(a.date), date)
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      present: 'bg-success text-white',
      absent: 'bg-error text-white',
      'half-day': 'bg-warning text-white',
      leave: 'bg-blue-500 text-white'
    };
    return colors[status] || 'bg-gray-200 text-gray-600';
  };

  const formatTime = (dateString) => {
    if (!dateString) return '--:--';
    return format(parseISO(dateString), 'hh:mm a');
  };

  const monthDays = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth)
  });

  const canCheckIn = !todayAttendance || !todayAttendance.checkIn;
  const canCheckOut = todayAttendance && todayAttendance.checkIn && !todayAttendance.checkOut;

  return (
    <PageWrapper>
      <div className="mb-6">
        <h1 className="text-3xl font-black text-primary tracking-tighter">Attendance Tracker</h1>
        <p className="text-muted text-sm mt-1">Monitor your daily presence and work hours</p>
      </div>

      {/* Today's Status Card */}
      <Card className="mb-6 bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-bold text-primary">Today's Status</h3>
            </div>
            <p className="text-sm text-muted">{format(new Date(), 'EEEE, MMMM dd, yyyy')}</p>
            
            {todayAttendance && (
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider">Check-in</p>
                  <p className="text-lg font-bold text-primary">{formatTime(todayAttendance.checkIn)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider">Check-out</p>
                  <p className="text-lg font-bold text-primary">{formatTime(todayAttendance.checkOut)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider">Work Hours</p>
                  <p className="text-lg font-bold text-primary">{todayAttendance.workHours?.toFixed(1) || '0.0'} hrs</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleCheckIn}
              disabled={!canCheckIn || checkingIn}
              variant={canCheckIn ? "primary" : "secondary"}
              className="flex items-center gap-2"
            >
              <LogIn size={18} />
              {checkingIn ? 'Checking In...' : 'Check In'}
            </Button>
            <Button
              onClick={handleCheckOut}
              disabled={!canCheckOut || checkingOut}
              variant={canCheckOut ? "primary" : "secondary"}
              className="flex items-center gap-2"
            >
              <LogOut size={18} />
              {checkingOut ? 'Checking Out...' : 'Check Out'}
            </Button>
          </div>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-success">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">Present Days</p>
          <p className="text-2xl font-bold text-primary">{stats.present || 0}</p>
        </Card>
        <Card className="border-l-4 border-l-error">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">Absent Days</p>
          <p className="text-2xl font-bold text-primary">{stats.absent || 0}</p>
        </Card>
        <Card className="border-l-4 border-l-warning">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">Half Days</p>
          <p className="text-2xl font-bold text-primary">{stats.halfDay || 0}</p>
        </Card>
        <Card className="border-l-4 border-l-blue-500">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">Total Hours</p>
          <p className="text-2xl font-bold text-primary">{stats.totalHours?.toFixed(1) || '0.0'}</p>
        </Card>
      </div>

      {/* Calendar View */}
      <Card title="Monthly Attendance" subtitle={format(currentMonth, 'MMMM yyyy')}>
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          >
            Next
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted">Loading...</div>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-bold text-muted uppercase p-2">
                {day}
              </div>
            ))}
            
            {monthDays.map((day, idx) => {
              const attendance = getAttendanceForDate(day);
              const isToday = isSameDay(day, new Date());
              
              return (
                <div
                  key={idx}
                  className={cn(
                    "aspect-square p-2 rounded-lg border text-center relative",
                    isToday && "ring-2 ring-primary",
                    attendance ? getStatusColor(attendance.status) : "bg-gray-50 text-gray-400"
                  )}
                >
                  <div className="text-sm font-bold">{format(day, 'd')}</div>
                  {attendance && (
                    <div className="text-[10px] mt-1 opacity-90">
                      {attendance.workHours?.toFixed(1)}h
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-success"></div>
            <span className="text-xs text-muted">Present</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-warning"></div>
            <span className="text-xs text-muted">Half Day</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-500"></div>
            <span className="text-xs text-muted">Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-error"></div>
            <span className="text-xs text-muted">Absent</span>
          </div>
        </div>
      </Card>
    </PageWrapper>
  );
};

export default EmployeeAttendance;
