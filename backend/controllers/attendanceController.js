const Attendance = require('../models/Attendance');
const User = require('../models/User');

// @desc    Check-in for the day
// @route   POST /api/attendance/check-in
// @access  Private (Employee)
const checkIn = async (req, res) => {
    try {
        const { location } = req.body;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Check if already checked in today
        const existingAttendance = await Attendance.findOne({
            user: req.user.id,
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (existingAttendance && existingAttendance.checkIn) {
            return res.status(400).json({
                success: false,
                message: 'Already checked in today'
            });
        }

        const attendance = existingAttendance || new Attendance({
            user: req.user.id,
            date: today
        });

        attendance.checkIn = new Date();
        attendance.location = location || 'Office';
        attendance.status = 'present';

        await attendance.save();

        res.json({
            success: true,
            message: 'Checked in successfully',
            data: attendance
        });
    } catch (error) {
        console.error('Check-in Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check in',
            error: error.message
        });
    }
};

// @desc    Check-out for the day
// @route   POST /api/attendance/check-out
// @access  Private (Employee)
const checkOut = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({
            user: req.user.id,
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
        });

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: 'No check-in record found for today'
            });
        }

        if (attendance.checkOut) {
            return res.status(400).json({
                success: false,
                message: 'Already checked out today'
            });
        }

        attendance.checkOut = new Date();
        await attendance.save();

        res.json({
            success: true,
            message: 'Checked out successfully',
            data: attendance
        });
    } catch (error) {
        console.error('Check-out Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check out',
            error: error.message
        });
    }
};

// @desc    Get today's attendance status
// @route   GET /api/attendance/today
// @access  Private (Employee)
const getTodayAttendance = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await Attendance.findOne({
            user: req.user.id,
            date: {
                $gte: today,
                $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
            }
        }).populate('user', 'name email employeeId');

        res.json({
            success: true,
            data: attendance
        });
    } catch (error) {
        console.error('Get Today Attendance Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch today\'s attendance',
            error: error.message
        });
    }
};

// @desc    Get my attendance history
// @route   GET /api/attendance/my-attendance
// @access  Private (Employee)
const getMyAttendance = async (req, res) => {
    try {
        const { month, year } = req.query;
        
        let query = { user: req.user.id };
        
        if (month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);
            query.date = { $gte: startDate, $lte: endDate };
        }

        const attendance = await Attendance.find(query)
            .populate('user', 'name email employeeId')
            .sort({ date: -1 });

        // Calculate statistics
        const stats = {
            total: attendance.length,
            present: attendance.filter(a => a.status === 'present').length,
            absent: attendance.filter(a => a.status === 'absent').length,
            halfDay: attendance.filter(a => a.status === 'half-day').length,
            leave: attendance.filter(a => a.status === 'leave').length,
            totalHours: attendance.reduce((sum, a) => sum + (a.workHours || 0), 0)
        };

        res.json({
            success: true,
            count: attendance.length,
            stats,
            data: attendance
        });
    } catch (error) {
        console.error('Get My Attendance Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch attendance',
            error: error.message
        });
    }
};

// @desc    Get all attendance records (Admin)
// @route   GET /api/attendance
// @access  Private (Admin)
const getAllAttendance = async (req, res) => {
    try {
        const { userId, month, year, status } = req.query;
        
        let query = {};
        
        if (userId) {
            query.user = userId;
        }
        
        if (month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0);
            query.date = { $gte: startDate, $lte: endDate };
        }
        
        if (status) {
            query.status = status;
        }

        const attendance = await Attendance.find(query)
            .populate('user', 'name email employeeId department designation')
            .populate('approvedBy', 'name')
            .sort({ date: -1 });

        res.json({
            success: true,
            count: attendance.length,
            data: attendance
        });
    } catch (error) {
        console.error('Get All Attendance Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch attendance records',
            error: error.message
        });
    }
};

// @desc    Update attendance (Admin)
// @route   PUT /api/attendance/:id
// @access  Private (Admin)
const updateAttendance = async (req, res) => {
    try {
        const { status, remarks, isApproved } = req.body;

        const attendance = await Attendance.findById(req.params.id);

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: 'Attendance record not found'
            });
        }

        if (status) attendance.status = status;
        if (remarks) attendance.remarks = remarks;
        if (isApproved !== undefined) {
            attendance.isApproved = isApproved;
            attendance.approvedBy = req.user.id;
        }

        await attendance.save();
        await attendance.populate('user', 'name email employeeId');

        res.json({
            success: true,
            message: 'Attendance updated successfully',
            data: attendance
        });
    } catch (error) {
        console.error('Update Attendance Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update attendance',
            error: error.message
        });
    }
};

// @desc    Delete attendance record
// @route   DELETE /api/attendance/:id
// @access  Private (Admin)
const deleteAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.findById(req.params.id);

        if (!attendance) {
            return res.status(404).json({
                success: false,
                message: 'Attendance record not found'
            });
        }

        await attendance.deleteOne();

        res.json({
            success: true,
            message: 'Attendance record deleted successfully'
        });
    } catch (error) {
        console.error('Delete Attendance Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete attendance',
            error: error.message
        });
    }
};

module.exports = {
    checkIn,
    checkOut,
    getTodayAttendance,
    getMyAttendance,
    getAllAttendance,
    updateAttendance,
    deleteAttendance
};
