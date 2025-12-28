const db = require('./db');
const mysql = require('mysql2/promise');

async function dropRegisterNo() {
    try {
        console.log('Dropping register_no column users table...');

        // Check if column exists first (optional, but safe)
        const [columns] = await db.query("SHOW COLUMNS FROM users LIKE 'register_no'");
        if (columns.length === 0) {
            console.log("Column 'register_no' does not exist. No action needed.");
            process.exit(0);
        }

        await db.query('ALTER TABLE users DROP COLUMN register_no');
        console.log('✅ Successfully dropped register_no column.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error dropping column:', err.message);
        process.exit(1);
    }
}

dropRegisterNo();
