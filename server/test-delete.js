// Native fetch is used

const BASE_URL = 'http://localhost:5000/api';

async function testDelete() {
    try {
        // 1. Register a user to delete
        console.log('1. Registering dummy user to delete...');
        const regRes = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                full_name: 'Delete Me',
                email: 'delete@test.com',
                password: 'password123',
                role: 'Student'
            })
        });
        const regText = await regRes.text();
        if (!regRes.ok) {
            console.log("FINAL_ERR:" + regText);
            return;
        }
        console.log('Registration Status:', regRes.status);
        console.log('Registration Response:', regText);

        let regData;
        try {
            regData = JSON.parse(regText);
        } catch (e) {
            throw new Error(`Failed to parse response: ${regText}`);
        }

        if (!regRes.ok && !regData.error.includes('Email already exists')) {
            throw new Error(`Registration failed: ${regData.error}`);
        }
        console.log('Registration step complete (User might already exist)');

        // 2. Fetch users to find ID
        console.log('2. Fetching user list...');
        const listRes = await fetch(`${BASE_URL}/users`);
        const users = await listRes.json();

        // Find our user
        const targetUser = users.find(u => u.email === 'delete@test.com');
        if (!targetUser) {
            console.log('User not found in list (maybe already deleted?)');
            return;
        }
        console.log('Found user to delete:', targetUser.id);

        // 3. Delete the user
        console.log('3. Deleting user...');
        const delRes = await fetch(`${BASE_URL}/users/${targetUser.id}`, {
            method: 'DELETE'
        });
        const delData = await delRes.json();
        console.log('Delete Result:', delData);

        if (delRes.ok) {
            console.log('SUCCESS: User deletion verified.');
        } else {
            console.error('FAILED: Could not delete user.');
        }

    } catch (error) {
        console.error('Test Failed:', error);
    }
}

testDelete();
