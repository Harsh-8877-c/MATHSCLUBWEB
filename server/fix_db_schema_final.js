const db = require('./db');

async function fixSchema() {
    try {
        console.log('Starting Schema Fix...');

        // 1. Drop register_no / register_number if they exist
        const [cols] = await db.query('SHOW COLUMNS FROM users');
        const colNames = cols.map(c => c.Field);

        if (colNames.includes('register_no')) {
            console.log('Dropping register_no...');
            await db.query('ALTER TABLE users DROP COLUMN register_no');
        }
        if (colNames.includes('register_number')) {
            console.log('Dropping register_number...');
            await db.query('ALTER TABLE users DROP COLUMN register_number');
        }

        // 2. Fix updatedAt default
        if (colNames.includes('updatedAt')) {
            console.log('Fixing updatedAt default...');
            await db.query('ALTER TABLE users MODIFY COLUMN updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
        } else {
            console.log('Adding updatedAt column...');
            await db.query('ALTER TABLE users ADD COLUMN updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP');
        }

        console.log('✅ Schema Fix Complete.');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error fixing schema:', err.message);
        process.exit(1);
    }
}

fixSchema();
