const db = require('./db');

async function rollbackTables() {
    try {
        console.log('Dropping interaction tables...');
        const connection = await db.getConnection();

        await connection.query('DROP TABLE IF EXISTS event_attendance');
        await connection.query('DROP TABLE IF EXISTS event_feedback');
        await connection.query('DROP TABLE IF EXISTS event_media');

        console.log('Tables dropped.');
        connection.release();

    } catch (err) {
        console.error('Error dropping tables:', err);
    } finally {
        process.exit();
    }
}

rollbackTables();
