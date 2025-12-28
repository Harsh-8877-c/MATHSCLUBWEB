const axios = require('axios');
const db = require('./db');

const roles = ['Student', 'Coordinator', 'ClubMember', 'Admin'];

async function testAllRoles() {
    console.log('--- Starting Verification for All Roles ---');

    for (const role of roles) {
        const email = `test_${role.toLowerCase()}@gmail.com`;
        const user = {
            full_name: `Test ${role}`,
            email: email,
            password: 'password123',
            role: role
        };

        try {
            console.log(`\nTesting Role: ${role}`);

            // 1. Cleanup
            await db.query('DELETE FROM users WHERE email = ?', [email]);

            // 2. Register via API
            console.log(`Attempting API Register for ${email}...`);
            await axios.post('http://localhost:5000/api/auth/register', user);
            console.log('API Request Success.');

            // 3. Verify in DB
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            if (rows.length > 0) {
                const u = rows[0];
                console.log(`✅ DB Verification PASS: User found.`);
                console.log(`   ID: ${u.id}, Role: ${u.role}, Approved: ${u.is_approved}, CreatedAt: ${u.createdAt}`);
            } else {
                console.error(`❌ DB Verification FAIL: User not found in DB.`);
            }

        } catch (error) {
            console.error(`❌ Test Failed for ${role}:`, error.response ? error.response.data : error.message);
            if (error.code === 'ECONNREFUSED') {
                console.error("Server is not running! Please start the backend server.");
                process.exit(1);
            }
        }
    }

    console.log('\n--- Verification Complete ---');
    process.exit();
}

testAllRoles();
