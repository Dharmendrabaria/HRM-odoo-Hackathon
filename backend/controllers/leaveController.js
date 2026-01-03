const Leave = require('../models/Leave');
const User = require('../models/User');

// @desc    Apply for leave
// @route   POST /api/leaves
// @access  Private (Employee)
const applyLeave = async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;

        // Validation
        if (!leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if start date is before end date
        if (new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({
                success: false,
                message: 'Start date must be before end date'
            });
        }

        // Create leave application
        const leave = await Leave.create({
            user: req.user.id,
            leaveType,
            startDate,
            endDate,
            reason,
            status: 'pending'
        });

        // Populate user details
        await leave.populate('user', 'name email employeeId department');

        res.status(201).json({
            success: true,
            message: 'Leave application submitted successfully',
            data: leave
        });
    } catch (error) {
        console.error('Apply Leave Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to apply for leave',
            error: error.message
        });
    }
};

// @desc    Get all leaves for current user
// @route   GET /api/leaves/my-leaves
// @access  Private (Employee)
const getMyLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ user: req.user.id })
            .populate('user', 'name email employeeId department')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: leaves.length,
            data: leaves
        });
    } catch (error) {
        console.error('Get My Leaves Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch leaves',
            error: error.message
        });
    }
};

// @desc    Get all leave applications (Admin)
// @route   GET /api/leaves
// @access  Private (Admin)
const getAllLeaves = async (req, res) => {
    try {
        const { status } = req.query;
        
        let query = {};
        if (status) {
            query.status = status;
        }

        const leaves = await Leave.find(query)
            .populate('user', 'name email employeeId department designation')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: leaves.length,
            data: leaves
        });
    } catch (error) {
        console.error('Get All Leaves Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch leaves',
            error: error.message
        });
    }
};

// @desc    Update leave status (Approve/Reject)
// @route   PUT /api/leaves/:id
// @access  Private (Admin)
const updateLeaveStatus = async (req, res) => {
    try {
        const { status, adminComment } = req.body;

        if (!status || !['approved', 'rejected'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be approved or rejected'
            });
        }

        const leave = await Leave.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({
                success: false,
                message: 'Leave application not found'
            });
        }

        leave.status = status;
        if (adminComment) {
            leave.adminComment = adminComment;
        }

        await leave.save();
        await leave.populate('user', 'name email employeeId department');

        // If approved, update user's leave balance
        if (status === 'approved') {
            const user = await User.findById(leave.user._id);
            if (user && user.leaveBalance) {
                const leaveTypeKey = leave.leaveType;
                if (user.leaveBalance[leaveTypeKey] !== undefined) {
                    // Calculate number of days
                    const days = Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24)) + 1;
                    user.leaveBalance[leaveTypeKey] = Math.max(0, user.leaveBalance[leaveTypeKey] - days);
                    await user.save();
                }
            }
        }

        res.json({
            success: true,
            message: `Leave ${status} successfully`,
            data: leave
        });
    } catch (error) {
        console.error('Update Leave Status Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update leave status',
            error: error.message
        });
    }
};

// @desc    Delete leave application
// @route   DELETE /api/leaves/:id
// @access  Private (Employee - own leaves only)
const deleteLeave = async (req, res) => {
    try {
        const leave = await Leave.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({
                success: false,
                message: 'Leave application not found'
            });
        }

        // Check if user owns this leave or is admin
        if (leave.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this leave'
            });
        }

        // Can only delete pending leaves
        if (leave.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete approved or rejected leaves'
            });
        }

        await leave.deleteOne();

        res.json({
            success: true,
            message: 'Leave application deleted successfully'
        });
    } catch (error) {
        console.error('Delete Leave Error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete leave',
            error: error.message
        });
    }
};

module.exports = {
    applyLeave,
    getMyLeaves,
    getAllLeaves,
    updateLeaveStatus,
    deleteLeave
};
