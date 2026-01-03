const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const {
    getMyPayroll,
    getAllPayroll,
    createPayroll,
    updatePayroll,
    deletePayroll,
    getPayrollSlip,
    generatePayroll
} = require('../controllers/payrollController');

// Employee routes
router.get('/my-payroll', protect, getMyPayroll);
router.get('/slip/:id', protect, getPayrollSlip);

// Admin routes
router.get('/', protect, authorize('admin', 'hr'), getAllPayroll);
router.post('/', protect, authorize('admin', 'hr'), createPayroll);
router.put('/:id', protect, authorize('admin', 'hr'), updatePayroll);
router.delete('/:id', protect, authorize('admin', 'hr'), deletePayroll);
router.post('/generate', protect, authorize('admin', 'hr'), generatePayroll);

module.exports = router;
