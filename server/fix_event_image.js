const db = require('./db');
async function fix() {
    try {
        console.log('Making event_image nullable...');
        await db.query('ALTER TABLE events MODIFY COLUMN event_image VARCHAR(255) NULL');
        console.log('Success.');
    } catch (e) { console.error(e); }
    process.exit();
}
fix();
