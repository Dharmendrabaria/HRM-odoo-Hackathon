const Payroll = require('../models/Payroll');
const User = require('../models/User');

// @desc    Get my payroll records
// @route   GET /api/payroll/my-payroll
// @access  Private (Employee)
const getMyPayroll = async (req, res) => {
    try {
        const { month, year } = req.query;
        
        let query = { user: req.user.id };
        
        if (month && year) {
            query.month = month;
            query.year = parseInt(year);
        }

        const payroll = await Payroll.find(query)
            .populate('user', 'name email employeeId department designation')
            .sort({ year: -1, month: -1 });

        res.json({
            success: true,
            count: payroll.length,
            data: payroll
        });
    } catch (error) {
        console.error('Get My Payroll Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payroll records',
            error: error.message
        });
    }
};

// @desc    Get all payroll records (Admin)
// @route   GET /api/payroll
// @access  Private (Admin)
const getAllPayroll = async (req, res) => {
    try {
        const { userId, month, year, status } = req.query;
        
        let query = {};
        
        if (userId) query.user = userId;
        if (month) query.month = month;
        if (year) query.year = parseInt(year);
        if (status) query.status = status;

        const payroll = await Payroll.find(query)
            .populate('user', 'name email employeeId department designation')
            .sort({ year: -1, month: -1 });

        res.json({
            success: true,
            count: payroll.length,
            data: payroll
        });
    } catch (error) {
        console.error('Get All Payroll Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payroll records',
            error: error.message
        });
    }
};

// @desc    Create payroll record (Admin)
// @route   POST /api/payroll
// @access  Private (Admin)
const createPayroll = async (req, res) => {
    try {
        const {
            userId,
            month,
            year,
            basicSalary,
            allowances,
            deductions,
            workingDays,
            presentDays,
            remarks
        } = req.body;

        // Validation
        if (!userId || !month || !year || !basicSalary) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if payroll already exists for this month
        const existingPayroll = await Payroll.findOne({
            user: userId,
            month,
            year
        });

        if (existingPayroll) {
            return res.status(400).json({
                success: false,
                message: 'Payroll already exists for this month'
            });
        }

        const payroll = await Payroll.create({
            user: userId,
            month,
            year,
            basicSalary,
            allowances: allowances || {},
            deductions: deductions || {},
            workingDays: workingDays || 0,
            presentDays: presentDays || 0,
            remarks
        });

        await payroll.populate('user', 'name email employeeId department');

        res.status(201).json({
            success: true,
            message: 'Payroll created successfully',
            data: payroll
        });
    } catch (error) {
        console.error('Create Payroll Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create payroll',
            error: error.message
        });
    }
};

// @desc    Update payroll record (Admin)
// @route   PUT /api/payroll/:id
// @access  Private (Admin)
const updatePayroll = async (req, res) => {
    try {
        const {
            basicSalary,
            allowances,
            deductions,
            workingDays,
            presentDays,
            status,
            remarks
        } = req.body;

        const payroll = await Payroll.findById(req.params.id);

        if (!payroll) {
            return res.status(404).json({
                success: false,
                message: 'Payroll record not found'
            });
        }

        if (basicSalary) payroll.basicSalary = basicSalary;
        if (allowances) payroll.allowances = { ...payroll.allowances, ...allowances };
        if (deductions) payroll.deductions = { ...payroll.deductions, ...deductions };
        if (workingDays !== undefined) payroll.workingDays = workingDays;
        if (presentDays !== undefined) payroll.presentDays = presentDays;
        if (status) {
            payroll.status = status;
            if (status === 'paid') {
                payroll.paidOn = new Date();
            }
        }
        if (remarks) payroll.remarks = remarks;

        await payroll.save();
        await payroll.populate('user', 'name email employeeId department');

        res.json({
            success: true,
            message: 'Payroll updated successfully',
            data: payroll
        });
    } catch (error) {
        console.error('Update Payroll Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update payroll',
            error: error.message
        });
    }
};

// @desc    Delete payroll record (Admin)
// @route   DELETE /api/payroll/:id
// @access  Private (Admin)
const deletePayroll = async (req, res) => {
    try {
        const payroll = await Payroll.findById(req.params.id);

        if (!payroll) {
            return res.status(404).json({
                success: false,
                message: 'Payroll record not found'
            });
        }

        await payroll.deleteOne();

        res.json({
            success: true,
            message: 'Payroll record deleted successfully'
        });
    } catch (error) {
        console.error('Delete Payroll Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete payroll',
            error: error.message
        });
    }
};

// @desc    Get payroll slip
// @route   GET /api/payroll/slip/:id
// @access  Private
const getPayrollSlip = async (req, res) => {
    try {
        const payroll = await Payroll.findById(req.params.id)
            .populate('user', 'name email employeeId department designation');

        if (!payroll) {
            return res.status(404).json({
                success: false,
                message: 'Payroll record not found'
            });
        }

        // Check authorization
        if (req.user.role !== 'admin' && payroll.user._id.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this payroll'
            });
        }

        res.json({
            success: true,
            data: payroll
        });
    } catch (error) {
        console.error('Get Payroll Slip Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch payroll slip',
            error: error.message
        });
    }
};

// @desc    Generate payroll for all employees (Admin)
// @route   POST /api/payroll/generate
// @access  Private (Admin)
const generatePayroll = async (req, res) => {
    try {
        const { month, year } = req.body;

        if (!month || !year) {
            return res.status(400).json({
                success: false,
                message: 'Please provide month and year'
            });
        }

        // Get all active employees
        const employees = await User.find({ status: 'active', role: 'employee' });

        const payrollRecords = [];
        const errors = [];

        for (const employee of employees) {
            try {
                // Check if payroll already exists
                const existing = await Payroll.findOne({
                    user: employee._id,
                    month,
                    year
                });

                if (existing) {
                    errors.push({
                        employee: employee.name,
                        error: 'Payroll already exists'
                    });
                    continue;
                }

                // Get salary from user's salaryStructure
                const basicSalary = employee.salaryStructure?.basic || 0;
                const allowances = employee.salaryStructure?.allowances || {};
                const deductions = employee.salaryStructure?.deductions || {};

                const payroll = await Payroll.create({
                    user: employee._id,
                    month,
                    year,
                    basicSalary,
                    allowances,
                    deductions,
                    workingDays: 0,
                    presentDays: 0
                });

                payrollRecords.push(payroll);
            } catch (err) {
                errors.push({
                    employee: employee.name,
                    error: err.message
                });
            }
        }

        res.json({
            success: true,
            message: `Generated ${payrollRecords.length} payroll records`,
            data: {
                generated: payrollRecords.length,
                errors: errors.length,
                errorDetails: errors
            }
        });
    } catch (error) {
        console.error('Generate Payroll Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to generate payroll',
            error: error.message
        });
    }
};

module.exports = {
    getMyPayroll,
    getAllPayroll,
    createPayroll,
    updatePayroll,
    deletePayroll,
    getPayrollSlip,
    generatePayroll
};
