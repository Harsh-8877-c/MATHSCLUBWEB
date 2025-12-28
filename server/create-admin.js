require('dotenv').config();
const db = require('./db');
const bcrypt = require('bcryptjs');

async function createAdmin() {
    const email = 'harsh.kumar60456@gmail.com';
    const password = '123';
    const fullName = 'Admin User';
    const role = 'Admin';

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Check if user exists
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            console.log('User already exists. Updating to Admin...');
            await db.query('UPDATE users SET role = ?, password_hash = ?, is_approved = 1 WHERE email = ?', [role, passwordHash, email]);
            console.log('User updated to Admin with new password.');
        } else {
            console.log('Creating new Admin user...');
            await db.query(
                'INSERT INTO users (full_name, email, password_hash, role, is_approved) VALUES (?, ?, ?, ?, 1)',
                [fullName, email, passwordHash, role]
            );
            console.log('Admin user created successfully.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Error creating admin:', err);
        process.exit(1);
    }
}

createAdmin();
