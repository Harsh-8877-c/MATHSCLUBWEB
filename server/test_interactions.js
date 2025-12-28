const axios = require('axios');
const API_URL = 'http://localhost:5000/api';

async function testInteractions() {
    try {
        console.log('1. Login as Admin...');
        // Reuse logic from previous tests or assume admin exists
        const timestamp = Date.now();
        const email = `interact_test_${timestamp}@gmail.com`;

        await axios.post(`${API_URL}/auth/register`, {
            full_name: 'Interact Admin',
            username: `interact_${timestamp}`,
            email: email,
            password: 'password123',
            role: 'Admin'
        });

        const loginRes = await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: 'password123'
        });
        const token = loginRes.data.token;
        const userId = loginRes.data.user.id;
        console.log('   Logged in.');

        console.log('2. Create Event...');
        const eventRes = await axios.post(`${API_URL}/events`, {
            title: 'Interactive Event',
            description: 'Testing media/feedback',
            date: '2025-01-01',
            time: '12:00',
            location: 'Lab'
        }, { headers: { Authorization: `Bearer ${token}` } });
        const eventId = eventRes.data.eventId;
        console.log('   Event Created:', eventId);

        console.log('3. Add Media...');
        await axios.post(`${API_URL}/events/${eventId}/media`, {
            url: 'https://example.com/photo.jpg',
            type: 'image',
            caption: 'Test Photo'
        }, { headers: { Authorization: `Bearer ${token}` } });
        console.log('   Media Added.');

        console.log('4. Submit Feedback...');
        await axios.post(`${API_URL}/events/${eventId}/feedback`, {
            rating: 5,
            comment: 'Great event!'
        }, { headers: { Authorization: `Bearer ${token}` } });
        console.log('   Feedback Submitted.');

        console.log('5. Mark Attendance...');
        await axios.post(`${API_URL}/events/${eventId}/attendance`, {
            userId: userId,
            status: 'present'
        }, { headers: { Authorization: `Bearer ${token}` } });
        console.log('   Attendance Marked.');

        console.log('6. Verify Details...');
        const detailsRes = await axios.get(`${API_URL}/events/${eventId}/details`);
        const d = detailsRes.data;

        console.log(`   Rating: ${d.rating} (Expected 5)`);
        console.log(`   Reviews: ${d.reviewCount} (Expected 1)`);
        console.log(`   Attendees: ${d.attendees} (Expected 1)`);
        console.log(`   Media Count: ${d.media.length} (Expected 1)`);

        if (d.rating == 5 && d.reviewCount == 1 && d.attendees == 1 && d.media.length == 1) {
            console.log('✅ Verification SUCCESS');
        } else {
            console.log('❌ Verification FAILED');
        }

    } catch (e) {
        console.error('Test Failed:', e.response?.data || e.message);
    }
}

testInteractions();
