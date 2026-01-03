const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('🔌 Connecting to MongoDB...');
        
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log('✅ MongoDB Connected Successfully!');
        console.log(`   📍 Host: ${conn.connection.host}`);
        console.log(`   📊 Database: ${conn.connection.name}`);
        console.log(`   🔌 Port: ${conn.connection.port}`);
        console.log(`   ✨ Ready State: ${conn.connection.readyState}\n`);

        // Connection event listeners
        mongoose.connection.on('connected', () => {
            console.log('✅ Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ Mongoose connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️  Mongoose disconnected from MongoDB');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('🔌 MongoDB connection closed due to app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error('❌ MongoDB Connection Error!');
        console.error(`   Error: ${error.message}`);
        
        if (error.message.includes('ECONNREFUSED')) {
            console.error('\n💡 Troubleshooting:');
            console.error('   1. Make sure MongoDB is installed and running');
            console.error('   2. Start MongoDB service:');
            console.error('      - Windows: net start MongoDB');
            console.error('      - Mac/Linux: sudo systemctl start mongod');
            console.error('   3. Check if MongoDB is running on port 27017');
            console.error('   4. Verify MONGO_URI in .env file');
        }
        
        console.error(`\n   Stack: ${error.stack}\n`);
        process.exit(1);
    }
};

module.exports = connectDB;
