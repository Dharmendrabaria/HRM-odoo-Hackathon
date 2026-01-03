# 🌟 Dayflow - Human Resource Management System

<div align="center">

![Dayflow HRMS](https://img.shields.io/badge/Dayflow-HRMS-blue?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-orange?style=for-the-badge)

**Every workday, perfectly aligned.**

A modern, full-stack Human Resource Management System built with React, Node.js, Express, and MongoDB.

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 About

**Dayflow HRMS** is a comprehensive Human Resource Management System designed to streamline and digitize core HR operations. Built with modern web technologies, it provides a seamless experience for both employees and administrators.

### 🎨 Key Highlights

- ✅ **Modern UI/UX** - Premium, responsive design with smooth animations
- ✅ **Role-Based Access** - Separate dashboards for Employees and Admins
- ✅ **Real-Time Updates** - Instant data synchronization
- ✅ **Secure Authentication** - JWT-based authentication system
- ✅ **Database Integration** - MongoDB for reliable data storage
- ✅ **Production Ready** - Optimized and tested for deployment

---

## ✨ Features

### 🔐 Authentication & Authorization

- User registration with email and employee ID
- Secure login with JWT tokens
- Role-based access control (Admin/Employee)
- Password encryption with bcrypt
- Protected routes and API endpoints

### 👥 Employee Management

- **Employee Onboarding** - 2-step wizard for adding new employees
- **Employee Directory** - Search and filter employees
- **Profile Management** - View and edit employee details
- **Profile Pictures** - Upload and manage profile images
- **Department & Designation** - Organize by departments

### ⏰ Attendance Management

- **Check-In/Check-Out** - One-click attendance marking
- **Monthly Calendar** - Visual attendance tracking
- **Work Hours Calculation** - Automatic calculation
- **Status Tracking** - Present, Absent, Half-day, Leave
- **Statistics Dashboard** - Attendance analytics
- **Admin Approval** - Review and approve attendance

### 🏖️ Leave Management

- **Apply for Leave** - Multiple leave types (Paid, Sick, Casual, Unpaid)
- **Leave History** - View all past leave requests
- **Cancel Requests** - Cancel pending leave applications
- **Admin Approval** - Review, approve, or reject leaves
- **Search & Filter** - Find specific leave requests
- **Comments System** - Add admin comments to leaves

### 💰 Payroll Management

- **Salary Structure** - Detailed breakdown of salary components
- **Allowances** - HRA, Transport, Medical, Other
- **Deductions** - Tax, PF, Insurance, Other
- **Auto-Calculations** - Gross and Net salary computation
- **Payroll Records** - Monthly salary history
- **Bulk Generation** - Generate payroll for all employees

### 📊 Dashboard & Analytics

- **Employee Dashboard** - Quick access to key features
- **Admin Dashboard** - Overview of all operations
- **Statistics Cards** - Visual data representation
- **Recent Activity** - Track latest updates
- **Charts & Graphs** - Data visualization

---

## 🛠️ Tech Stack

### Frontend

- **React** 18.3.1 - UI library
- **React Router** 7.1.1 - Client-side routing
- **Vite** 6.0.5 - Build tool
- **Tailwind CSS** 3.4.17 - Styling
- **Lucide React** - Icons
- **Date-fns** - Date manipulation
- **Framer Motion** - Animations
- **Axios** - HTTP client

### Backend

- **Node.js** 18+ - Runtime environment
- **Express** 4.21.2 - Web framework
- **MongoDB** 6.0+ - Database
- **Mongoose** 8.9.4 - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Dotenv** - Environment variables

---

## 📦 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **MongoDB** (v6.0.0 or higher)
- **npm** or **yarn**

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/dayflow-hrms.git
cd dayflow-hrms
```

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### Step 4: Set Up Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://127.0.0.1:27017/HRM

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# SMTP Configuration (Optional - for email notifications)
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_EMAIL=your_email@example.com
SMTP_PASSWORD=your_password
FROM_EMAIL=noreply@dayflow.com
FROM_NAME=DayflowHRMS
```

### Step 5: Start MongoDB

**Windows:**

```bash
net start MongoDB
```

**Mac/Linux:**

```bash
sudo systemctl start mongod
```

### Step 6: Verify Database Connection

```bash
cd backend
node test-db-connection.js
```

Expected output:

```
✅ MongoDB Connected Successfully!
📚 Existing Collections (4)
✅ All Tests Passed!
```

---

## 🚀 Usage

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

Server will start on `http://localhost:5000`

Expected output:

```
🔌 Connecting to MongoDB...
✅ MongoDB Connected Successfully!
   📍 Host: 127.0.0.1
   📊 Database: HRM
   🔌 Port: 27017

🚀 Server running in development mode on port 5000
🌐 API URL: http://localhost:5000

📊 Database Statistics:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ✅ users                9 documents
   ✅ attendances          2 documents
   ✅ leaves               1 documents
   ⚪ payrolls             0 documents
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

#### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will start on `http://localhost:5173`

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Backend in Production

```bash
cd backend
NODE_ENV=production npm start
```

---

## 🔑 Default Credentials

### Admin Account

```
Email: admin@dayflow.com
Password: admin123
```

### Employee Account

```
Email: employee@dayflow.com
Password: employee123
```

> **Note:** Change these credentials after first login in production!

---

## 📡 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "employeeId": "EMP001",
  "role": "employee",
  "department": "Engineering",
  "designation": "Software Engineer"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User

```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Attendance Endpoints

#### Check-In

```http
POST /api/attendance/check-in
Authorization: Bearer <token>
Content-Type: application/json

{
  "location": "Office"
}
```

#### Check-Out

```http
POST /api/attendance/check-out
Authorization: Bearer <token>
```

#### Get My Attendance

```http
GET /api/attendance/my-attendance?month=1&year=2024
Authorization: Bearer <token>
```

#### Get All Attendance (Admin)

```http
GET /api/attendance
Authorization: Bearer <admin-token>
```

### Leave Endpoints

#### Apply for Leave

```http
POST /api/leaves
Authorization: Bearer <token>
Content-Type: application/json

{
  "leaveType": "paid",
  "startDate": "2024-01-15",
  "endDate": "2024-01-17",
  "reason": "Family vacation"
}
```

#### Get My Leaves

```http
GET /api/leaves/my-leaves
Authorization: Bearer <token>
```

#### Approve/Reject Leave (Admin)

```http
PUT /api/leaves/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "approved",
  "adminComment": "Approved for vacation"
}
```

### Payroll Endpoints

#### Get My Payroll

```http
GET /api/payroll/my-payroll?month=01&year=2024
Authorization: Bearer <token>
```

#### Create Payroll (Admin)

```http
POST /api/payroll
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "userId": "user_id_here",
  "month": "01",
  "year": 2024,
  "basicSalary": 50000,
  "allowances": {
    "hra": 10000,
    "transport": 2000,
    "medical": 1500
  },
  "deductions": {
    "tax": 5000,
    "pf": 2000
  }
}
```

### Profile Endpoints

#### Get Profile

```http
GET /api/profile
Authorization: Bearer <token>
```

#### Update Profile

```http
PUT /api/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

#### Upload Profile Picture

```http
POST /api/profile/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

profileImage: <file>
```

---

## 🗄️ Database Schema

### Users Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  employeeId: String (unique),
  role: "employee" | "admin",
  department: String,
  designation: String,
  phone: String,
  profileImage: String,
  salaryStructure: {
    basic: Number,
    allowances: Object,
    deductions: Object
  },
  leaveBalance: {
    paid: Number,
    sick: Number,
    casual: Number,
    unpaid: Number
  },
  status: "active" | "inactive",
  createdAt: Date,
  updatedAt: Date
}
```

### Attendances Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  date: Date,
  checkIn: Date,
  checkOut: Date,
  status: "present" | "absent" | "half-day" | "leave",
  workHours: Number (auto-calculated),
  location: String,
  remarks: String,
  approvedBy: ObjectId (ref: User),
  isApproved: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Leaves Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  leaveType: "paid" | "sick" | "casual" | "unpaid",
  startDate: Date,
  endDate: Date,
  reason: String,
  status: "pending" | "approved" | "rejected",
  adminComment: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Payrolls Collection

```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  month: String,
  year: Number,
  basicSalary: Number,
  allowances: {
    hra: Number,
    transport: Number,
    medical: Number,
    other: Number
  },
  deductions: {
    tax: Number,
    pf: Number,
    insurance: Number,
    other: Number
  },
  grossSalary: Number (auto-calculated),
  netSalary: Number (auto-calculated),
  status: "pending" | "processed" | "paid",
  createdAt: Date,
  updatedAt: Date
}
```

---

## 📸 Screenshots

### Employee Dashboard

![Employee Dashboard](./screenshots/employee-dashboard.png)

### Attendance Calendar

![Attendance Calendar](./screenshots/attendance-calendar.png)

### Leave Management

![Leave Management](./screenshots/leave-management.png)

### Admin Dashboard

![Admin Dashboard](./screenshots/admin-dashboard.png)

---

## 📁 Project Structure

```
dayflow-hrms/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── attendanceController.js
│   │   ├── leaveController.js
│   │   └── payrollController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Attendance.js
│   │   ├── Leave.js
│   │   └── Payroll.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── attendanceRoutes.js
│   │   ├── leaveRoutes.js
│   │   ├── payrollRoutes.js
│   │   ├── profileRoutes.js
│   │   └── userRoutes.js
│   ├── uploads/
│   ├── utils/
│   │   └── verifyDB.js
│   ├── .env
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── test-db-connection.js
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   ├── layout/
    │   │   ├── charts/
    │   │   └── tables/
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── ToastContext.jsx
    │   ├── pages/
    │   │   ├── auth/
    │   │   ├── employee/
    │   │   ├── admin/
    │   │   └── onboarding/
    │   ├── routes/
    │   │   └── AppRoutes.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## 🧪 Testing

### Test Database Connection

```bash
cd backend
node test-db-connection.js
```

### Run Backend Tests

```bash
cd backend
npm test
```

### Run Frontend Tests

```bash
cd frontend
npm test
```

---

## 🚀 Deployment

### Deploy to Heroku

1. Create Heroku app

```bash
heroku create dayflow-hrms
```

2. Add MongoDB Atlas

```bash
heroku addons:create mongolab
```

3. Set environment variables

```bash
heroku config:set JWT_SECRET=your_secret_key
heroku config:set NODE_ENV=production
```

4. Deploy

```bash
git push heroku main
```

### Deploy to Vercel (Frontend)

1. Install Vercel CLI

```bash
npm i -g vercel
```

2. Deploy

```bash
cd frontend
vercel --prod
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards

- Use ESLint for JavaScript linting
- Follow Airbnb style guide
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Yash Patel**

- GitHub: [@yashpatel](https://github.com/yashpatel)
- Email: yash@dayflow.com

---

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB for the robust database
- Tailwind CSS for the utility-first CSS framework
- Lucide for the beautiful icons
- All contributors who helped improve this project

---

## 📞 Support

For support, email support@dayflow.com or join our Slack channel.

---

## 🔄 Changelog

### Version 1.0.0 (2026-01-03)

- ✅ Initial release
- ✅ Authentication & Authorization
- ✅ Employee Management
- ✅ Attendance System
- ✅ Leave Management
- ✅ Payroll System
- ✅ Profile Management
- ✅ Dashboard & Analytics

---

<div align="center">

**Made with ❤️ by the Dayflow Team**

⭐ Star us on GitHub — it helps!

[Report Bug](https://github.com/yourusername/dayflow-hrms/issues) • [Request Feature](https://github.com/yourusername/dayflow-hrms/issues)

</div>
