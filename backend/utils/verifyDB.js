const mongoose = require('mongoose');

/**
 * Verify MongoDB Connection and Display Statistics
 */
const verifyConnection = async () => {
    try {
        if (mongoose.connection.readyState !== 1) {
            console.log('⚠️  MongoDB not connected yet. Waiting...');
            return;
        }

        console.log('\n📊 Database Statistics:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        const db = mongoose.connection.db;

        // Get collection stats
        const collections = await db.listCollections().toArray();
        
        for (const col of collections) {
            try {
                const count = await db.collection(col.name).countDocuments();
                const icon = count > 0 ? '✅' : '⚪';
                console.log(`   ${icon} ${col.name.padEnd(20)} ${count} documents`);
            } catch (err) {
                console.log(`   ⚠️  ${col.name.padEnd(20)} Error reading`);
            }
        }

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    } catch (error) {
        console.error('❌ Error verifying connection:', error.message);
    }
};

module.exports = verifyConnection;
