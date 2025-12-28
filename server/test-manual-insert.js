const db = require('./db');
const bcrypt = require('bcryptjs');

async function testInsert() {
    try {
        const full_name = 'Manual Test';
        const email = 'manual@test.com';
        const hashedPassword = await bcrypt.hash('password', 10);
        const userRole = 'Student';
        const isApproved = false;
        const username = email.split('@')[0];

        console.log('Attempting insert with:', { full_name, email, userRole, isApproved, username });

        await db.query(
            'INSERT INTO users (full_name, email, password_hash, role, is_approved, username) VALUES (?, ?, ?, ?, ?, ?)',
            [full_name, email, hashedPassword, userRole, isApproved, username]
        );

        console.log('Insert SUCCESS!');
        process.exit(0);

    } catch (err) {
        console.error('Insert FAILED:', err.message);
        process.exit(1);
    }
}

testInsert();
