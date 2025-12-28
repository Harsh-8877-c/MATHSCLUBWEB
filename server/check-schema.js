const db = require('./db');

async function checkSchema() {
    try {
        const [rows] = await db.query("SHOW COLUMNS FROM users LIKE 'role'");
        console.log('Role Column Schema:', JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkSchema();
