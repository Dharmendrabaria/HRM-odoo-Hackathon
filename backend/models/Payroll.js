const mongoose = require('mongoose');

const payrollSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    month: {
        type: String, // e.g., "2024-01"
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    basicSalary: {
        type: Number,
        required: true,
    },
    allowances: {
        hra: { type: Number, default: 0 },
        transport: { type: Number, default: 0 },
        medical: { type: Number, default: 0 },
        other: { type: Number, default: 0 }
    },
    deductions: {
        tax: { type: Number, default: 0 },
        pf: { type: Number, default: 0 },
        insurance: { type: Number, default: 0 },
        other: { type: Number, default: 0 }
    },
    totalAllowances: {
        type: Number,
        default: 0,
    },
    totalDeductions: {
        type: Number,
        default: 0,
    },
    grossSalary: {
        type: Number,
        required: true,
    },
    netSalary: {
        type: Number,
        required: true,
    },
    workingDays: {
        type: Number,
        default: 0,
    },
    presentDays: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'processed', 'paid'],
        default: 'pending',
    },
    paidOn: {
        type: Date,
    },
    remarks: {
        type: String,
    }
}, {
    timestamps: true,
});

// Calculate totals before saving
payrollSchema.pre('save', function(next) {
    // Calculate total allowances
    this.totalAllowances = 
        (this.allowances.hra || 0) +
        (this.allowances.transport || 0) +
        (this.allowances.medical || 0) +
        (this.allowances.other || 0);

    // Calculate total deductions
    this.totalDeductions = 
        (this.deductions.tax || 0) +
        (this.deductions.pf || 0) +
        (this.deductions.insurance || 0) +
        (this.deductions.other || 0);

    // Calculate gross salary
    this.grossSalary = this.basicSalary + this.totalAllowances;

    // Calculate net salary
    this.netSalary = this.grossSalary - this.totalDeductions;

    next();
});

module.exports = mongoose.model('Payroll', payrollSchema);
