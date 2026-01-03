const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const colors = require('colors');
const User = require('./models/User'); // Adjust path if needed
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const runDebug = async () => {
    try {
        console.log("1. Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("   Connected to:", process.env.MONGO_URI);

        console.log("\n2. Cleaning up test user (test@example.com)...");
        await User.deleteOne({ email: 'test@example.com' });
        
        console.log("\n3. Creating new user directly via Model...");
        const rawPassword = 'password123';
        const user = new User({
            name: "Debug User",
            email: "test@example.com",
            password: rawPassword,
            role: "employee",
            employeeId: "DEBUG001",
            department: "IT",
            designation: "Tester"
        });

        await user.save();
        console.log("   User saved. Database _id:", user._id);
        console.log("   Hashed Password in DB:", user.password);

        console.log("\n4. Verifying Password Login...");
        const fetchedUser = await User.findOne({ email: 'test@example.com' }).select('+password');
        
        if (!fetchedUser) {
            console.error("   CRITICAL: Could not find user after save!");
        } else {
            console.log("   User found.");
            const isMatch = await fetchedUser.matchPassword(rawPassword);
            console.log(`   Password Match Result: ${isMatch ? 'SUCCESS (true)' : 'FAILED (false)'}`);
            
            if (isMatch) {
                console.log("\n✅ AUTH LOGIC IS WORKING PERFECTLY ON BACKEND.");
            } else {
                console.error("\n❌ AUTH LOGIC BROKEN: Password mismatch.");
            }
        }

        process.exit();

    } catch (error) {
        console.error("\n❌ ERROR:", error);
        process.exit(1);
    }
};

runDebug();
