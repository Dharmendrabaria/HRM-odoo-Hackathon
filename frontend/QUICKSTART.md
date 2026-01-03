# 🚀 Dayflow HRMS - Quick Start Guide

## ⚡ Get Started in 5 Minutes!

---

## 📋 Prerequisites Checklist

Before starting, make sure you have:

- [ ] Node.js 18+ installed
- [ ] MongoDB 6.0+ installed
- [ ] npm or yarn installed
- [ ] Code editor (VS Code recommended)
- [ ] Terminal/Command Prompt

---

## 🎯 Step-by-Step Setup

### Step 1: Clone or Download Project ✅

```bash
# If using Git
git clone https://github.com/yourusername/dayflow-hrms.git
cd dayflow-hrms

# Or download and extract ZIP file
```

### Step 2: Install Backend Dependencies ✅

```bash
cd backend
npm install
```

**Expected output:**

```
✅ Installed 50+ packages
```

### Step 3: Configure Environment ✅

Create `.env` file in `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/HRM
JWT_SECRET=HRM_secure_jwt_secret_key_2025
NODE_ENV=development
```

### Step 4: Start MongoDB ✅

**Windows:**

```bash
net start MongoDB
```

**Mac/Linux:**

```bash
sudo systemctl start mongod
```

**Verify MongoDB is running:**

```bash
cd backend
node test-db-connection.js
```

**Expected output:**

```
✅ MongoDB Connected Successfully!
📚 Existing Collections (4)
✅ All Tests Passed!
```

### Step 5: Start Backend Server ✅

```bash
cd backend
npm run dev
```

**Expected output:**

```
🔌 Connecting to MongoDB...
✅ MongoDB Connected Successfully!
   📍 Host: 127.0.0.1
   📊 Database: HRM
   🔌 Port: 27017

🚀 Server running in development mode on port 5000
🌐 API URL: http://localhost:5000
📊 Database: HRM

📊 Database Statistics:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ✅ users                0 documents
   ⚪ attendances          0 documents
   ⚪ leaves               0 documents
   ⚪ payrolls             0 documents
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

✅ **Backend is running!**

### Step 6: Install Frontend Dependencies ✅

Open a **new terminal** window:

```bash
cd frontend
npm install
```

### Step 7: Start Frontend Server ✅

```bash
npm run dev
```

**Expected output:**

```
VITE v6.0.5  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

✅ **Frontend is running!**

### Step 8: Access Application ✅

Open your browser and go to:

```
http://localhost:5173
```

---

## 🎉 You're All Set!

### Default Login Credentials:

**Admin Account:**

```
Email: admin@dayflow.com
Password: admin123
```

**Employee Account:**

```
Email: employee@dayflow.com
Password: employee123
```

> ⚠️ **Note:** Create these accounts first by registering!

---

## 🧪 Quick Test

### 1. Register Admin Account

1. Go to `http://localhost:5173/register`
2. Fill in the form:
   - Name: Admin User
   - Email: admin@dayflow.com
   - Password: admin123
   - Employee ID: ADMIN001
   - Role: Admin
   - Department: Management
   - Designation: Administrator
3. Click "Sign Up"

### 2. Login

1. Go to `http://localhost:5173/login`
2. Enter credentials
3. Click "Sign In"

### 3. Test Features

**As Admin:**

- ✅ View Dashboard
- ✅ Add Employee (Onboarding)
- ✅ View Employees
- ✅ Approve Leaves
- ✅ View Attendance

**As Employee:**

- ✅ View Dashboard
- ✅ Check-In/Check-Out
- ✅ Apply for Leave
- ✅ View Profile
- ✅ View Payroll

---

## 🛠️ Troubleshooting

### Issue 1: MongoDB Connection Failed

**Error:**

```
❌ MongoDB Connection Error!
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**

1. Check if MongoDB is running:

   ```bash
   # Windows
   sc query MongoDB

   # Mac/Linux
   sudo systemctl status mongod
   ```

2. Start MongoDB:

   ```bash
   # Windows
   net start MongoDB

   # Mac/Linux
   sudo systemctl start mongod
   ```

### Issue 2: Port Already in Use

**Error:**

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

1. Change port in `.env`:

   ```env
   PORT=5001
   ```

2. Or kill the process using port 5000:

   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F

   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   ```

### Issue 3: Module Not Found

**Error:**

```
Error: Cannot find module 'express'
```

**Solution:**

```bash
cd backend
npm install
```

### Issue 4: Frontend Not Loading

**Solution:**

1. Clear browser cache
2. Restart frontend server:
   ```bash
   # Press Ctrl+C to stop
   npm run dev
   ```

---

## 📁 Folder Structure

```
dayflow-hrms/
├── backend/              ← Backend API
│   ├── .env             ← Environment variables
│   ├── server.js        ← Entry point
│   └── ...
└── frontend/            ← React Frontend
    ├── src/
    └── ...
```

---

## 🔑 Important URLs

| Service     | URL                              |
| ----------- | -------------------------------- |
| Frontend    | http://localhost:5173            |
| Backend API | http://localhost:5000            |
| API Health  | http://localhost:5000/api/health |

---

## 📊 Database Access

### Using MongoDB Compass

1. Open MongoDB Compass
2. Connect to: `mongodb://127.0.0.1:27017`
3. Select database: `HRM`
4. View collections:
   - users
   - attendances
   - leaves
   - payrolls

### Using Mongo Shell

```bash
mongosh
use HRM
show collections
db.users.find().pretty()
```

---

## 🎯 Next Steps

After setup:

1. **Create Admin Account** - Register first user as admin
2. **Add Employees** - Use onboarding wizard
3. **Test Attendance** - Check-in and check-out
4. **Apply for Leave** - Test leave management
5. **Explore Features** - Try all functionalities

---

## 📚 Documentation

- **Main README:** `/README.md`
- **Backend API:** `/backend/README.md`
- **MongoDB Guide:** `/.agent/workflows/mongodb-setup-guide.md`
- **Implementation Report:** `/.agent/workflows/FINAL-IMPLEMENTATION-REPORT.md`

---

## 🆘 Need Help?

If you encounter any issues:

1. Check terminal for error messages
2. Verify MongoDB is running
3. Check `.env` configuration
4. Review documentation
5. Run test script: `node backend/test-db-connection.js`

---

## ✅ Success Checklist

- [ ] MongoDB installed and running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] `.env` file configured
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 5173
- [ ] Can access http://localhost:5173
- [ ] Can register new user
- [ ] Can login successfully
- [ ] Can view dashboard

---

## 🎉 Congratulations!

You've successfully set up **Dayflow HRMS**!

**Time to completion:** ~5 minutes ⚡

**What's working:**

- ✅ Authentication
- ✅ Employee Management
- ✅ Attendance System
- ✅ Leave Management
- ✅ Payroll System
- ✅ Profile Management

**Start exploring and enjoy!** 🚀

---

<div align="center">

**Made with ❤️ by Dayflow Team**

[Report Issue](https://github.com/yourusername/dayflow-hrms/issues) • [Documentation](./README.md) • [API Docs](./backend/README.md)

</div>
