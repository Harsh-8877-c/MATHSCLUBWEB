const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testEventFlow() {
    try {
        const timestamp = Date.now();
        const email = `admin_test_${timestamp}@gmail.com`; // Must handle gmail validation
        const password = 'password123';

        console.log('0. Registering temporary Admin...');
        await axios.post(`${API_URL}/auth/register`, {
            full_name: 'Test Admin',
            username: `admin_${timestamp}`,
            email: email,
            password: password,
            confirmPassword: password, // Frontend sends this, backend might expect it or ignored
            role: 'Admin'
        });

        console.log('1. Logging in as Admin...');
        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: password,
            role: 'Admin'
        });
        const token = loginRes.data.token;
        console.log('   Login successful. Token received.');

        console.log('2. Creating a test event...');
        const eventRes = await axios.post(`${API_URL}/events`, {
            title: 'Test Event ' + Date.now(),
            description: 'This is a test event created by script',
            date: '2025-12-31',
            time: '18:00',
            location: 'Test Hall'
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('   Event created. ID:', eventRes.data.eventId);

        console.log('3. Fetching all events...');
        const listRes = await axios.get(`${API_URL}/events`);
        console.log(`   Fetched ${listRes.data.length} events.`);

        const found = listRes.data.find(e => e.id === eventRes.data.eventId);
        if (found) {
            console.log('   ✅ Verification SUCCESS: Newly created event found in the list.');
        } else {
            console.error('   ❌ Verification FAILED: Created event not found in list.');
        }

    } catch (error) {
        console.error('❌ Test Failed:', error.response ? error.response.data : error.message);
    }
}

testEventFlow();
