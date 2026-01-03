const express = require('express');
const { getDashboardStats, getAllUsers } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', protect, getDashboardStats);
router.get('/', protect, authorize('admin'), getAllUsers);

module.exports = router;
