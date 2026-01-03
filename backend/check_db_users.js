const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const checkUsers = async () => {
    try {
        console.log("Connecting to DB:", process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected.");

        const users = await User.find({});
        console.log(`\nFound ${users.length} users in the database:`);
        
        if (users.length === 0) {
            console.log("⚠️ No users found! The database is empty.");
        } else {
            users.forEach(u => {
                console.log(`- [${u.role}] ${u.name} (${u.email}) | ID: ${u.employeeId || 'N/A'}`);
            });
        }

        console.log("\nIf you don't see this in Compass:");
        console.log("1. Click the 'Refresh' button (circular arrow) next to the database name.");
        console.log("2. Ensure you are looking at the 'HRM' database.");
        console.log("3. Ensure Compass is connected to 'mongodb://127.0.0.1:27017'.");

        process.exit();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkUsers();
