const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const path = require('path');
const User = require('./models/User');
const Attendance = require('./models/Attendance');
const Leave = require('./models/Leave');
const Payroll = require('./models/Payroll');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Attendance.deleteMany();
        await Leave.deleteMany();
        await Payroll.deleteMany();

        // Hash password manually for seeder consistency
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash('password123', 10);

        const users = await User.create([
            {
                name: 'Admin User',
                email: 'admin@dayflow.com',
                password: hashedPassword,
                role: 'admin',
                employeeId: 'ADMIN001',
                department: 'Management',
                designation: 'System Administrator',
                status: 'active'
            },
            {
                name: 'John Doe',
                email: 'employee@dayflow.com',
                password: hashedPassword,
                role: 'employee',
                employeeId: 'EMP001',
                department: 'Engineering',
                designation: 'Senior Developer',
                salaryStructure: {
                    basic: 50000,
                    allowances: 20000,
                    deductions: 5000
                },
                leaveBalance: {
                    paid: 10,
                    sick: 5,
                    casual: 3,
                    unpaid: 0
                },
                status: 'active'
            },
            {
                name: 'Jane Smith',
                email: 'jane@dayflow.com',
                password: hashedPassword,
                role: 'employee',
                employeeId: 'EMP002',
                department: 'Design',
                designation: 'UI/UX Designer',
                status: 'active'
            }
        ]);

        const admin = users[0]._id;
        const employee1 = users[1]._id;

        // Sample Attendance
        await Attendance.create([
            {
                user: employee1,
                date: new Date(),
                checkIn: new Date(new Date().setHours(9, 0, 0)),
                checkOut: new Date(new Date().setHours(18, 0, 0)),
                status: 'present',
                remarks: 'On time'
            },
            {
                user: employee1,
                date: new Date(new Date().setDate(new Date().getDate() - 1)),
                checkIn: new Date(new Date().setDate(new Date().getDate() - 1)).setHours(9, 15, 0),
                checkOut: new Date(new Date().setDate(new Date().getDate() - 1)).setHours(18, 10, 0),
                status: 'present',
                remarks: 'Slight delay'
            }
        ]);

        // Sample Leave
        await Leave.create([
            {
                user: employee1,
                leaveType: 'sick',
                startDate: new Date(),
                endDate: new Date(),
                reason: 'Not feeling well',
                status: 'pending'
            }
        ]);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Attendance.deleteMany();
        await Leave.deleteMany();
        await Payroll.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
