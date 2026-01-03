const User = require('../models/User');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');

// @desc    Get dashboard stats for employee
// @route   GET /api/users/dashboard
// @access  Private
const getDashboardStats = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // 1. Attendance Today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Mocking some stats logic
        const attendanceCount = await Attendance.countDocuments({ user: userId, status: 'present' }); // Total present days
        const leavesCount = await Leave.countDocuments({ user: userId, status: 'pending' });

        // Build data structure expected by frontend
        // We can return simple stats for now
        res.json({
            success: true,
            data: {
                attendance: "95%", // Placeholder calculation or real logic
                pendingLeaves: leavesCount,
                payslips: 12, // Placeholder
                attendanceData: [
                    { name: "Mon", present: 8, absent: 0, late: 0 },
                    { name: "Tue", present: 7, absent: 0, late: 1 },
                    { name: "Wed", present: 8, absent: 0, late: 0 },
                    { name: "Thu", present: 6, absent: 1, late: 1 },
                    { name: "Fri", present: 8, absent: 0, late: 0 },
                ] // Should ideally come from DB aggregation
            }
        });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).select('-password');
        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getDashboardStats, getAllUsers };
