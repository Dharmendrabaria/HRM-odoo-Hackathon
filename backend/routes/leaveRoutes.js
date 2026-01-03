const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    updateLeaveStatus,
    deleteLeave
} = require('../controllers/leaveController');

// Employee routes
router.post('/', protect, applyLeave);
router.get('/my-leaves', protect, getMyLeaves);
router.delete('/:id', protect, deleteLeave);

// Admin routes
router.get('/', protect, authorize('admin', 'hr'), getAllLeaves);
router.put('/:id', protect, authorize('admin', 'hr'), updateLeaveStatus);

module.exports = router;
