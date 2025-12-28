const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data'); // Ensure this is available or use native FormData for recent Node versions
const API_URL = 'http://localhost:5000/api';

async function testFileUpload() {
    try {
        console.log('1. Login as Admin...');
        const timestamp = Date.now();
        const email = `upload_test_${timestamp}@gmail.com`;

        await axios.post(`${API_URL}/auth/register`, {
            full_name: 'Upload Admin',
            username: `upload_${timestamp}`,
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
            title: 'File Event',
            description: 'Testing file upload',
            date: '2025-01-05',
            time: '09:00',
            location: 'Room 101'
        }, { headers: { Authorization: `Bearer ${token}` } });
        const eventId = eventRes.data.eventId;
        console.log('   Event Created:', eventId);

        console.log('3. Upload File...');
        // Create a dummy file if it doesn't exist
        const filePath = path.join(__dirname, 'test_image.txt');
        fs.writeFileSync(filePath, 'fake image content');

        // Mocking an image upload (server checks mimetype, so we might need a real image or mock headers)
        // Since our multer filter checks mimetype, let's try to bypass or use a real image structure if possible.
        // Actually, let's just create a file with .jpg extension and hope multer just checks extension or we can force content-type in form-data.

        const form = new FormData();
        // form-data allows specifying filename and contentType
        form.append('type', 'image');
        form.append('file', fs.createReadStream(filePath), {
            filename: 'test.jpg',
            contentType: 'image/jpeg'
        });

        const uploadRes = await axios.post(`${API_URL}/events/${eventId}/media`, form, {
            headers: {
                ...form.getHeaders(),
                Authorization: `Bearer ${token}`
            }
        });

        console.log('   Upload Response:', uploadRes.data);

        console.log('4. Verify URL...');
        if (uploadRes.data.url && uploadRes.data.url.includes('/uploads/events/')) {
            console.log('✅ File Upload Verification SUCCESS');
        } else {
            console.log('❌ File Upload Verification FAILED', uploadRes.data);
        }

        // Cleanup
        fs.unlinkSync(filePath);

    } catch (e) {
        console.error('Test Failed:', e.response?.data || e.message);
    }
}

testFileUpload();
