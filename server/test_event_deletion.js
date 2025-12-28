const axios = require('axios');
const API_URL = 'http://localhost:5000/api';

async function testEventDeletion() {
    try {
        console.log('1. Login as Admin...');
        const timestamp = Date.now();
        const email = `delete_admin_${timestamp}@gmail.com`;

        await axios.post(`${API_URL}/auth/register`, {
            full_name: 'Delete Admin',
            username: `del_admin_${timestamp}`,
            email: email,
            password: 'password123',
            role: 'Admin'
        });

        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: 'password123'
        });
        const token = loginRes.data.token;
        console.log('   Logged in.');

        console.log('2. Create Event to Delete...');
        const eventRes = await axios.post(`${API_URL}/events`, {
            title: 'Delete Me',
            description: 'This event will be deleted',
            date: '2025-12-31',
            time: '23:59',
            location: 'Void'
        }, { headers: { Authorization: `Bearer ${token}` } });
        const eventId = eventRes.data.eventId;
        console.log('   Event Created:', eventId);

        console.log('3. Delete Event...');
        await axios.delete(`${API_URL}/events/${eventId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('   Event Deleted.');

        console.log('4. Verify Deletion...');
        try {
            await axios.get(`${API_URL}/events/${eventId}/details`);
            console.log('❌ Event Still Exists (Failed)');
        } catch (e) {
            if (e.response && e.response.status === 404) {
                // Endpoint might not return 404 for details depending on implementation, 
                // but let's check the list or ensure it's gone.
                // Actually our details endpoint might crash or return empty if ID invalid in some setups, but 404 is expected.
                console.log('✅ Event Not Found (Success)');
            } else {
                // If getEventDetails isn't resilient or returns something else
                // Let's check list
                const listRes = await axios.get(`${API_URL}/events`);
                const found = listRes.data.find(e => e.id === eventId);
                if (!found) {
                    console.log('✅ Event successfully removed from list');
                } else {
                    console.log('❌ Event still in list');
                }
            }
        }

    } catch (e) {
        console.error('Test Failed:', JSON.stringify(e.response?.data || e.message, null, 2));
    }
}

testEventDeletion();
