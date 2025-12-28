const db = require('./db');
async function fix() {
    try {
        console.log('Dropping event_image...');
        try { await db.query('ALTER TABLE events DROP COLUMN event_image'); } catch (e) { console.log('Drop failed/not exists:', e.message) }

        console.log('Adding event_image...');
        try { await db.query('ALTER TABLE events ADD COLUMN event_image VARCHAR(255) NULL'); } catch (e) { console.log('Add failed:', e.message) }

        console.log('Done.');
    } catch (e) { console.error(e); }
    process.exit();
}
fix();
