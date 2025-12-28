const db = require('./db');

async function checkColumns() {
    try {
        const [rows] = await db.query('SHOW COLUMNS FROM users');
        console.log('Columns:');
        rows.forEach(r => console.log(`- ${r.Field} (Null: ${r.Null}, Default: ${r.Default})`));
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
checkColumns();
