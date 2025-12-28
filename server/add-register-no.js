const db = require('./db');

async function addRegisterNo() {
    try {
        console.log('Altering users table...');
        await db.query(`
            ALTER TABLE users 
            ADD COLUMN register_no VARCHAR(50) UNIQUE AFTER id
        `);
        console.log('Successfully added register_no column.');
        process.exit(0);
    } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
            console.log('Column register_no already exists.');
            process.exit(0);
        }
        console.error('Error altering table:', err);
        process.exit(1);
    }
}

addRegisterNo();
