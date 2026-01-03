import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/layout/Layout";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import CompleteProfile from "../pages/onboarding/CompleteProfile";

// Employee Pages
import EmployeeDashboard from "../pages/employee/Dashboard";
import EmployeeProfile from "../pages/employee/Profile";
import EmployeeAttendance from "../pages/employee/Attendance";
import EmployeeLeave from "../pages/employee/Leave";
import EmployeePayroll from "../pages/employee/Payroll";
import EmployeeNotifications from "../pages/employee/Notifications";
import EmployeeReports from "../pages/employee/Reports";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminEmployees from "../pages/admin/Employees";
import AdminAttendance from "../pages/admin/Attendance";
import AdminLeaveApprovals from "../pages/admin/LeaveApprovals";
import AdminLeaveManagement from "../pages/admin/LeaveManagement";
import AdminPayroll from "../pages/admin/Payroll";
import AdminNotifications from "../pages/admin/Notifications";
import AdminReports from "../pages/admin/Reports";
import AdminProfile from "../pages/admin/Profile";
import OnboardingWizard from "../pages/onboarding/OnboardingWizard";

// New Feature Pages
import Insights from "../pages/insights/Insights";
import Policies from "../pages/policies/Policies";
import Support from "../pages/support/Support";
import Lifecycle from "../pages/lifecycle/Lifecycle";
import OrgChartPage from "../pages/admin/OrgChartPage";
import Performance from "../pages/performance/Performance";
import CalendarPage from "../pages/calendar/CalendarPage";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard"} />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard"} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/complete-profile" element={user ? <CompleteProfile /> : <Navigate to="/login" />} />
      
      <Route path="/" element={<Navigate to={user ? (user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard") : "/login"} />} />

      {/* Employee Routes */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute user={user} allowedRole="employee">
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="profile" element={<EmployeeProfile />} />
        <Route path="attendance" element={<EmployeeAttendance />} />
        <Route path="leave" element={<EmployeeLeave />} />
        <Route path="payroll" element={<EmployeePayroll />} />
        <Route path="notifications" element={<EmployeeNotifications />} />
        <Route path="reports" element={<EmployeeReports />} />
        <Route path="insights" element={<Insights />} />
        <Route path="policies" element={<Policies />} />
        <Route path="support" element={<Support />} />
        <Route path="performance" element={<Performance />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute user={user} allowedRole="admin">
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="employees" element={<AdminEmployees />} />
        <Route path="attendance" element={<AdminAttendance />} />
        <Route path="leaves" element={<AdminLeaveApprovals />} />
        <Route path="leave-management" element={<AdminLeaveManagement />} />
        <Route path="payroll" element={<AdminPayroll />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="onboarding" element={<OnboardingWizard />} />
        <Route path="insights" element={<Insights />} />
        <Route path="policies" element={<Policies />} />
        <Route path="support" element={<Support />} />
        <Route path="lifecycle" element={<Lifecycle />} />
        <Route path="org-chart" element={<OrgChartPage />} />
        <Route path="performance" element={<Performance />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const ProtectedRoute = ({ user, children, allowedRole }) => {
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/employee/dashboard"} replace />;
  }
  return children;
};

export default AppRoutes;
