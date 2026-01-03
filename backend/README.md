# 🔧 Dayflow HRMS - Backend API

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.21-blue?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green?style=for-the-badge&logo=mongodb)

**RESTful API for Dayflow Human Resource Management System**

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Testing](#testing)
- [Deployment](#deployment)

---

## 🎯 About

This is the backend API for Dayflow HRMS, built with Node.js, Express, and MongoDB. It provides RESTful endpoints for authentication, employee management, attendance tracking, leave management, and payroll processing.

---

## ✨ Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-Based Access** - Admin and Employee roles
- ✅ **CRUD Operations** - Complete data management
- ✅ **File Uploads** - Profile picture management
- ✅ **Auto-Calculations** - Work hours, salary, leave days
- ✅ **Error Handling** - Comprehensive error responses
- ✅ **Input Validation** - Request validation
- ✅ **Database Integration** - MongoDB with Mongoose
- ✅ **API Documentation** - Well-documented endpoints

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- MongoDB 6.0+
- npm or yarn

### Steps

1. **Install Dependencies**

```bash
npm install
```

2. **Create .env File**

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/HRM
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```

3. **Start MongoDB**

```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

4. **Test Database Connection**

```bash
node test-db-connection.js
```

5. **Start Server**

```bash
# Development
npm run dev

# Production
npm start
```

---

## 🔧 Configuration

### Environment Variables

| Variable     | Description               | Default                       |
| ------------ | ------------------------- | ----------------------------- |
| `PORT`       | Server port               | 5000                          |
| `MONGO_URI`  | MongoDB connection string | mongodb://127.0.0.1:27017/HRM |
| `JWT_SECRET` | Secret key for JWT        | Required                      |
| `NODE_ENV`   | Environment mode          | development                   |

---

## 📡 API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Authentication

#### Register User

```http
POST /api/auth/register
```

**Body:**

```json
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
```

**Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User

```http
GET /api/auth/me
Headers: Authorization: Bearer <token>
```

---

### Attendance

#### Check-In

```http
POST /api/attendance/check-in
Headers: Authorization: Bearer <token>
```

**Body:**

```json
{
  "location": "Office"
}
```

#### Check-Out

```http
POST /api/attendance/check-out
Headers: Authorization: Bearer <token>
```

#### Get Today's Attendance

```http
GET /api/attendance/today
Headers: Authorization: Bearer <token>
```

#### Get My Attendance

```http
GET /api/attendance/my-attendance?month=1&year=2024
Headers: Authorization: Bearer <token>
```

#### Get All Attendance (Admin)

```http
GET /api/attendance
Headers: Authorization: Bearer <admin-token>
```

#### Update Attendance (Admin)

```http
PUT /api/attendance/:id
Headers: Authorization: Bearer <admin-token>
```

**Body:**

```json
{
  "status": "present",
  "isApproved": true,
  "remarks": "Approved"
}
```

---

### Leave Management

#### Apply for Leave

```http
POST /api/leaves
Headers: Authorization: Bearer <token>
```

**Body:**

```json
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
Headers: Authorization: Bearer <token>
```

#### Get All Leaves (Admin)

```http
GET /api/leaves?status=pending
Headers: Authorization: Bearer <admin-token>
```

#### Approve/Reject Leave (Admin)

```http
PUT /api/leaves/:id
Headers: Authorization: Bearer <admin-token>
```

**Body:**

```json
{
  "status": "approved",
  "adminComment": "Approved for vacation"
}
```

#### Delete Leave

```http
DELETE /api/leaves/:id
Headers: Authorization: Bearer <token>
```

---

### Payroll

#### Get My Payroll

```http
GET /api/payroll/my-payroll?month=01&year=2024
Headers: Authorization: Bearer <token>
```

#### Get All Payroll (Admin)

```http
GET /api/payroll
Headers: Authorization: Bearer <admin-token>
```

#### Create Payroll (Admin)

```http
POST /api/payroll
Headers: Authorization: Bearer <admin-token>
```

**Body:**

```json
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

#### Update Payroll (Admin)

```http
PUT /api/payroll/:id
Headers: Authorization: Bearer <admin-token>
```

#### Generate Bulk Payroll (Admin)

```http
POST /api/payroll/generate
Headers: Authorization: Bearer <admin-token>
```

**Body:**

```json
{
  "month": "01",
  "year": 2024
}
```

---

### Profile

#### Get Profile

```http
GET /api/profile
Headers: Authorization: Bearer <token>
```

#### Update Profile

```http
PUT /api/profile
Headers: Authorization: Bearer <token>
```

**Body:**

```json
{
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

#### Upload Profile Picture

```http
POST /api/profile/upload
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**

```
profileImage: <file>
```

#### Delete Profile Picture

```http
DELETE /api/profile/picture
Headers: Authorization: Bearer <token>
```

---

### Users (Admin)

#### Get All Users

```http
GET /api/users
Headers: Authorization: Bearer <admin-token>
```

#### Get User by ID

```http
GET /api/users/:id
Headers: Authorization: Bearer <admin-token>
```

---

## 🗄️ Database Models

### User Model

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  employeeId: String (required, unique),
  role: String (enum: ['employee', 'admin']),
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
    paid: Number (default: 12),
    sick: Number (default: 7),
    casual: Number (default: 5),
    unpaid: Number (default: 0)
  },
  status: String (enum: ['active', 'inactive']),
  timestamps: true
}
```

### Attendance Model

```javascript
{
  user: ObjectId (ref: 'User'),
  date: Date (required),
  checkIn: Date,
  checkOut: Date,
  status: String (enum: ['present', 'absent', 'half-day', 'leave']),
  workHours: Number (auto-calculated),
  location: String (default: 'Office'),
  remarks: String,
  approvedBy: ObjectId (ref: 'User'),
  isApproved: Boolean (default: false),
  timestamps: true
}
```

### Leave Model

```javascript
{
  user: ObjectId (ref: 'User'),
  leaveType: String (enum: ['paid', 'sick', 'casual', 'unpaid']),
  startDate: Date (required),
  endDate: Date (required),
  reason: String (required),
  status: String (enum: ['pending', 'approved', 'rejected']),
  adminComment: String,
  timestamps: true
}
```

### Payroll Model

```javascript
{
  user: ObjectId (ref: 'User'),
  month: String (required),
  year: Number (required),
  basicSalary: Number (required),
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
  totalAllowances: Number (auto-calculated),
  totalDeductions: Number (auto-calculated),
  grossSalary: Number (auto-calculated),
  netSalary: Number (auto-calculated),
  workingDays: Number,
  presentDays: Number,
  status: String (enum: ['pending', 'processed', 'paid']),
  paidOn: Date,
  remarks: String,
  timestamps: true
}
```

---

## 🧪 Testing

### Test Database Connection

```bash
node test-db-connection.js
```

### Manual API Testing

Use tools like:

- **Postman** - Import collection
- **Thunder Client** - VS Code extension
- **cURL** - Command line

Example cURL request:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dayflow.com","password":"admin123"}'
```

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── attendanceController.js
│   ├── leaveController.js
│   └── payrollController.js
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   └── errorMiddleware.js    # Error handling
├── models/
│   ├── User.js
│   ├── Attendance.js
│   ├── Leave.js
│   └── Payroll.js
├── routes/
│   ├── authRoutes.js
│   ├── attendanceRoutes.js
│   ├── leaveRoutes.js
│   ├── payrollRoutes.js
│   ├── profileRoutes.js
│   └── userRoutes.js
├── uploads/                  # Profile pictures
├── utils/
│   └── verifyDB.js          # DB verification
├── .env                     # Environment variables
├── app.js                   # Express app setup
├── server.js                # Server entry point
├── package.json
└── test-db-connection.js    # DB test script
```

---

## 🚀 Deployment

### Heroku

1. Create app

```bash
heroku create dayflow-api
```

2. Add MongoDB

```bash
heroku addons:create mongolab
```

3. Set config

```bash
heroku config:set JWT_SECRET=your_secret
heroku config:set NODE_ENV=production
```

4. Deploy

```bash
git push heroku main
```

### Railway

1. Connect GitHub repo
2. Add environment variables
3. Deploy automatically

---

## 🔒 Security

- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based authorization
- ✅ Input validation
- ✅ CORS configuration
- ✅ Environment variables
- ✅ Error handling

---

## 📊 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error"
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 📝 License

MIT License - see LICENSE file

---

## 👨‍💻 Author

**Yash Patel**

- Email: yash@dayflow.com

---

<div align="center">

**Dayflow HRMS Backend API v1.0.0**

Made with ❤️ using Node.js & Express

</div>
