export const USERS = [
  {
    id: "EMP001",
    name: "John Doe",
    email: "john@dayflow.com",
    password: "password123", // In a real app, never store plain text
    role: "employee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    designation: "Software Engineer",
    department: "Engineering",
    joinDate: "2023-01-15",
    address: "123 Main St, Tech City",
    phone: "555-0123",
    salary: 75000,
  },
  {
    id: "ADM001",
    name: "Jane Smith",
    email: "admin@dayflow.com",
    password: "admin123",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    designation: "HR Manager",
    department: "Human Resources",
    joinDate: "2022-05-10",
    address: "456 Corp Blvd, Biz Town",
    phone: "555-0987",
    salary: 90000,
  },
  {
    id: "EMP002",
    name: "Alice Johnson",
    email: "alice@dayflow.com",
    password: "password123",
    role: "employee",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    designation: "UI/UX Designer",
    department: "Design",
    joinDate: "2023-03-20",
    address: "789 Creative Ln, Artville",
    phone: "555-0456",
    salary: 70000,
  }
];

export const ATTENDANCE = [
  { id: 1, employeeId: "EMP001", date: "2023-10-25", status: "Present", checkIn: "09:00 AM", checkOut: "06:00 PM" },
  { id: 2, employeeId: "EMP001", date: "2023-10-26", status: "Present", checkIn: "09:15 AM", checkOut: "06:10 PM" },
  { id: 3, employeeId: "EMP001", date: "2023-10-27", status: "Absent", checkIn: "-", checkOut: "-" },
  { id: 4, employeeId: "EMP002", date: "2023-10-25", status: "Present", checkIn: "09:30 AM", checkOut: "06:30 PM" },
  { id: 5, employeeId: "EMP002", date: "2023-10-26", status: "Half-Day", checkIn: "09:30 AM", checkOut: "01:30 PM" },
];

export const LEAVES = [
  { id: 1, employeeId: "EMP001", type: "Sick Leave", from: "2023-11-01", to: "2023-11-02", status: "Approved", remarks: "Flu" },
  { id: 2, employeeId: "EMP002", type: "Paid Leave", from: "2023-11-05", to: "2023-11-10", status: "Pending", remarks: "Family vacation" },
  { id: 3, employeeId: "EMP001", type: "Unpaid Leave", from: "2023-12-01", to: "2023-12-01", status: "Rejected", remarks: "Personal work" },
];

export const PAYROLL = [
  { id: 1, employeeId: "EMP001", month: "October 2023", basic: 50000, hra: 20000, allowances: 5000, deductions: 2000, netSalary: 73000, status: "Paid" },
  { id: 2, employeeId: "EMP002", month: "October 2023", basic: 45000, hra: 18000, allowances: 7000, deductions: 1500, netSalary: 68500, status: "Processed" },
];

export const NOTIFICATIONS = [
  { id: 1, userId: "EMP001", message: "Your leave request for Nov 1-2 was approved.", date: "2023-10-28", read: false },
  { id: 2, userId: "EMP002", message: "Payslip for October 2023 is available.", date: "2023-11-01", read: true },
  { id: 3, userId: "ADM001", message: "New leave request from Alice Johnson.", date: "2023-11-05", read: false },
];
