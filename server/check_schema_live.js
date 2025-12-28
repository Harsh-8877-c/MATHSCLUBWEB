const db = require('./db');

async function checkSchema() {
    try {
        const [rows] = await db.query('DESCRIBE users');
        console.log(JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error('Error describing table:', err.message);
        process.exit(1);
    }
}

checkSchema();
