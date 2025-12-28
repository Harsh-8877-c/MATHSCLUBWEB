const db = require('./db');
async function fix() {
    try {
        console.log('Adding missing basic columns...');
        try { await db.query('ALTER TABLE events ADD COLUMN title VARCHAR(255) NOT NULL'); console.log('Added title'); } catch (e) { console.log(e.message) }
        try { await db.query('ALTER TABLE events ADD COLUMN description TEXT'); console.log('Added description'); } catch (e) { console.log(e.message) }
    } catch (e) { console.error(e); }
    process.exit();
}
fix();
