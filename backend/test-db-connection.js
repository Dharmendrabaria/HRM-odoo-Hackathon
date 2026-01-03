const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

console.log('🔍 MongoDB Connection Test Starting...\n');

// Display configuration
console.log('📋 Configuration:');
console.log(`   PORT: ${process.env.PORT}`);
console.log(`   MONGO_URI: ${process.env.MONGO_URI}`);
console.log(`   NODE_ENV: ${process.env.NODE_ENV}\n`);

const testConnection = async () => {
    try {
        console.log('🔌 Attempting to connect to MongoDB...');
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log('✅ MongoDB Connected Successfully!');
        console.log(`   Host: ${conn.connection.host}`);
        console.log(`   Database: ${conn.connection.name}`);
        console.log(`   Port: ${conn.connection.port}`);
        console.log(`   Ready State: ${conn.connection.readyState} (1 = connected)\n`);

        // Test database operations
        console.log('🧪 Testing Database Operations...\n');

        // List all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log(`📚 Existing Collections (${collections.length}):`);
        collections.forEach(col => {
            console.log(`   - ${col.name}`);
        });

        if (collections.length === 0) {
            console.log('   (No collections yet - will be created when data is inserted)');
        }

        console.log('\n📊 Collection Statistics:');
        
        // Check Users collection
        try {
            const userCount = await mongoose.connection.db.collection('users').countDocuments();
            console.log(`   Users: ${userCount} documents`);
        } catch (err) {
            console.log(`   Users: Collection not created yet`);
        }

        // Check Attendance collection
        try {
            const attendanceCount = await mongoose.connection.db.collection('attendances').countDocuments();
            console.log(`   Attendances: ${attendanceCount} documents`);
        } catch (err) {
            console.log(`   Attendances: Collection not created yet`);
        }

        // Check Leaves collection
        try {
            const leaveCount = await mongoose.connection.db.collection('leaves').countDocuments();
            console.log(`   Leaves: ${leaveCount} documents`);
        } catch (err) {
            console.log(`   Leaves: Collection not created yet`);
        }

        // Check Payroll collection
        try {
            const payrollCount = await mongoose.connection.db.collection('payrolls').countDocuments();
            console.log(`   Payrolls: ${payrollCount} documents`);
        } catch (err) {
            console.log(`   Payrolls: Collection not created yet`);
        }

        console.log('\n✅ All Tests Passed!');
        console.log('🎉 MongoDB is properly connected and working!\n');

        // Close connection
        await mongoose.connection.close();
        console.log('🔌 Connection closed successfully.');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ MongoDB Connection Failed!');
        console.error(`   Error: ${error.message}`);
        
        if (error.message.includes('ECONNREFUSED')) {
            console.error('\n💡 Troubleshooting:');
            console.error('   1. Make sure MongoDB is installed and running');
            console.error('   2. Start MongoDB service:');
            console.error('      - Windows: net start MongoDB');
            console.error('      - Mac/Linux: sudo systemctl start mongod');
            console.error('   3. Check if MongoDB is running on port 27017');
            console.error('   4. Verify MONGO_URI in .env file\n');
        } else if (error.message.includes('authentication')) {
            console.error('\n💡 Authentication Issue:');
            console.error('   1. Check MongoDB username and password');
            console.error('   2. Verify database user permissions');
            console.error('   3. Update MONGO_URI with correct credentials\n');
        } else {
            console.error(`\n   Stack: ${error.stack}\n`);
        }

        process.exit(1);
    }
};

// Run the test
testConnection();
