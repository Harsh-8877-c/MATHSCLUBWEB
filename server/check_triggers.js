const db = require('./db');
async function check() {
    try {
        const [rows] = await db.query('SHOW TRIGGERS');
        console.log('Triggers:', rows);
    } catch (e) { console.error(e); }
    process.exit();
}
check();
