const jwt = require('jsonwebtoken');

const payload = {
  userId: '123',  // Test user ID
  name: 'Test User'
};

const secret = 'your-secret-key';  // This should match the secret in your app.module.ts
const token = jwt.sign(payload, secret, { expiresIn: '1h' });

console.log('Generated JWT Token for testing:');
console.log(token);
console.log('\nTo test with curl:');
console.log('curl -X GET http://localhost:3000/todo -H "auth-user: ' + token + '"');
console.log('\nTo test with Postman:');
console.log('1. Add header "auth-user" with the token above');
console.log('2. Make requests to http://localhost:3000/todo');