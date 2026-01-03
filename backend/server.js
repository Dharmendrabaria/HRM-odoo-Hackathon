const app = require('./app');
const connectDB = require('./config/db');
const verifyDB = require('./utils/verifyDB');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

// Verify Mongo URI
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in .env file');
  process.exit(1);
}

// Connect Database
connectDB().then(() => {
  // Verify connection and show stats after 1 second
  setTimeout(() => {
    verifyDB();
  }, 1000);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`🌐 API URL: http://localhost:${PORT}`);
    console.log(`📊 Database: ${process.env.MONGO_URI.split('/').pop()}\n`);
});
