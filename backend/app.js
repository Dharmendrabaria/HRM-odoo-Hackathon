const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');

// Load env vars
dotenv.config();

// Route Imports
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const payrollRoutes = require('./routes/payrollRoutes');

const app = express();
const jwt = require('jsonwebtoken'); // Ensuring jwt is available if needed globally or just for debugging? No, not needed here.

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins for dev simplicity
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/payroll', payrollRoutes);

// Root
app.get('/', (req, res) => {
    res.send('Dayflow HRMS API is running...');
});

// Error Handler
app.use(errorHandler);

module.exports = app;
