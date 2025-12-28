const axios = require('axios');
const API_URL = 'http://localhost:5000/api';

async function testMedia() {
    try {
        console.log('1. Login as Admin...');
        const timestamp = Date.now();
        const email = `media_test_${timestamp}@gmail.com`;

        await axios.post(`${API_URL}/auth/register`, {
            full_name: 'Media Admin',
            username: `media_${timestamp}`,
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

        console.log('2. Create Event...');
        const eventRes = await axios.post(`${API_URL}/events`, {
            title: 'Media Event',
            description: 'Testing media',
            date: '2025-01-02',
            time: '14:00',
            location: 'Hall A'
        }, { headers: { Authorization: `Bearer ${token}` } });
        const eventId = eventRes.data.eventId;
        console.log('   Event Created:', eventId);

        console.log('3. Add Media...');
        const imageUrl = 'https://example.com/pic.jpg';
        await axios.post(`${API_URL}/events/${eventId}/media`, {
            url: imageUrl,
            type: 'image',
            caption: 'Test Pic'
        }, { headers: { Authorization: `Bearer ${token}` } });
        console.log('   Media Added.');

        console.log('4. Verify Media...');
        const mediaRes = await axios.get(`${API_URL}/events/${eventId}/media`);
        const media = mediaRes.data;

        if (media.length === 1 && media[0].url === imageUrl) {
            console.log('✅ Media Verification SUCCESS');
        } else {
            console.log('❌ Media Verification FAILED', media);
        }

    } catch (e) {
        console.error('Test Failed:', e.response?.data || e.message);
    }
}

testMedia();
