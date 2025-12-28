const db = require('./db');

async function alterEvents() {
    try {
        console.log('Altering events table...');

        // Add date
        try {
            await db.query('ALTER TABLE events ADD COLUMN date DATE NOT NULL');
            console.log('Added date.');
        } catch (e) { console.log('Date exists/error:', e.message); }

        // Add time
        try {
            await db.query('ALTER TABLE events ADD COLUMN time TIME NOT NULL');
            console.log('Added time.');
        } catch (e) { console.log('Time exists/error:', e.message); }

        // Add location
        try {
            await db.query('ALTER TABLE events ADD COLUMN location VARCHAR(255) NOT NULL');
            console.log('Added location.');
        } catch (e) { console.log('Location exists/error:', e.message); }

        // Ensure created_by exists
        try {
            await db.query('ALTER TABLE events ADD COLUMN created_by INT');
        } catch (e) { }

        // Ensure foreign key
        try {
            await db.query('ALTER TABLE events ADD CONSTRAINT fk_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL');
        } catch (e) { }


    } catch (e) {
        console.error(e);
    }
    process.exit();
}

alterEvents();
