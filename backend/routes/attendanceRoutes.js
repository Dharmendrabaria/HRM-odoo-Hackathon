const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    checkIn,
    checkOut,
    getTodayAttendance,
    getMyAttendance,
    getAllAttendance,
    updateAttendance,
    deleteAttendance
} = require('../controllers/attendanceController');

// Employee routes
router.post('/check-in', protect, checkIn);
router.post('/check-out', protect, checkOut);
router.get('/today', protect, getTodayAttendance);
router.get('/my-attendance', protect, getMyAttendance);

// Admin routes
router.get('/', protect, authorize('admin', 'hr'), getAllAttendance);
router.put('/:id', protect, authorize('admin', 'hr'), updateAttendance);
router.delete('/:id', protect, authorize('admin', 'hr'), deleteAttendance);

module.exports = router;
