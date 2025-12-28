const db = require('./db');

async function checkSchema() {
    try {
        console.log('Checking database schema...\n');

        const [columns] = await db.query("SHOW COLUMNS FROM users");

        console.log('Users table columns:');
        columns.forEach(col => {
            console.log(`- ${col.Field} (${col.Type}) ${col.Null === 'NO' ? 'NOT NULL' : 'NULL'} ${col.Default ? `DEFAULT ${col.Default}` : ''}`);
        });

        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

checkSchema();
