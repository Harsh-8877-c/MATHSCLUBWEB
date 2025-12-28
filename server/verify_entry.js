const axios = require('axios');
const db = require('./db');

async function testRegistration() {
    const testUser = {
        full_name: 'Test Entry',
        email: 'testentry@gmail.com',
        password: 'password123',
        role: 'Student'
    };

    try {
        console.log('1. Attempting Registration...');
        // Clean up first
        await db.query('DELETE FROM users WHERE email = ?', [testUser.email]);

        const response = await axios.post('http://localhost:5000/api/auth/register', testUser);
        console.log('Registration Response:', response.status, response.data);

        console.log('2. Verifying in Database...');
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [testUser.email]);

        if (rows.length > 0) {
            console.log('SUCCESS: User found in DB!');
            console.log('User Data:', rows[0]);
        } else {
            console.error('FAILURE: User NOT found in DB despite success response.');
        }

    } catch (error) {
        console.error('Test Failed:', error.response ? error.response.data : error.message);
    } finally {
        process.exit();
    }
}

testRegistration();
