// If node-fetch isn't installed and we're on older node, this might fail, 
// so let's use http module for zero-dependency reliability basically curling.
const http = require('http');

const data = JSON.stringify({
  name: 'API Tester',
  email: `apitest_${Date.now()}@example.com`,
  password: 'password123',
  confirmPassword: 'password123', // Not needed by backend but good to mimic
  empId: `API_${Date.now()}`,
  department: 'QA',
  role: 'employee'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

console.log("Sending Register Request to Backend...");
const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('BODY:', body);
    if (res.statusCode === 201) {
        console.log("\n✅ BACKEND REGISTER IS WORKING. User saved in DB.");
    } else {
        console.log("\n❌ BACKEND REGISTER FAILED.");
    }
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
