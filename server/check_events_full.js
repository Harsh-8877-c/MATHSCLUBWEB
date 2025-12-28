const db = require('./db');
async function check() {
    try {
        const [rows] = await db.query('DESCRIBE events');
        console.log('Events Table Columns:');
        rows.forEach(r => console.log(`- ${r.Field} (${r.Type})`));
    } catch (e) { console.error(e); }
    process.exit();
}
check();
