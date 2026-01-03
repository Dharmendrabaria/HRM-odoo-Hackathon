const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    checkIn: {
        type: Date,
    },
    checkOut: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['present', 'absent', 'leave', 'half-day'],
        default: 'absent',
    },
    workHours: {
        type: Number,
        default: 0,
    },
    location: {
        type: String,
        default: 'Office',
    },
    remarks: {
        type: String,
    },
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    isApproved: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

// Calculate work hours before saving
attendanceSchema.pre('save', function(next) {
    if (this.checkIn && this.checkOut) {
        const hours = (this.checkOut - this.checkIn) / (1000 * 60 * 60);
        this.workHours = Math.round(hours * 100) / 100;
        
        // Auto-set status based on work hours
        if (hours >= 8) {
            this.status = 'present';
        } else if (hours >= 4) {
            this.status = 'half-day';
        }
    }
    next();
});

module.exports = mongoose.model('Attendance', attendanceSchema);
