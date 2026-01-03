// Quick test script to verify token
const jwt = require('jsonwebtoken');

// Get JWT_SECRET from .env
require('dotenv').config();

const testToken = process.argv[2];

if (!testToken) {
    console.log('Usage: node test_token.js <your-token>');
    console.log('\nTo get your token:');
    console.log('1. Open browser console');
    console.log('2. Run: localStorage.getItem("dayflow_token")');
    console.log('3. Copy the token and run this script');
    process.exit(1);
}

console.log('\n🔍 Testing Token...\n');
console.log('Token:', testToken.substring(0, 20) + '...');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Found ✅' : 'Missing ❌');

try {
    const decoded = jwt.verify(testToken, process.env.JWT_SECRET);
    console.log('\n✅ Token is VALID!\n');
    console.log('Decoded payload:');
    console.log(JSON.stringify(decoded, null, 2));
} catch (error) {
    console.log('\n❌ Token is INVALID!\n');
    console.log('Error:', error.message);
    console.log('Error type:', error.name);
}
