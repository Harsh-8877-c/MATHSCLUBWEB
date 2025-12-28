const db = require('./db');

async function fixSchema() {
    try {
        console.log('Checking events table...');
        try {
            const [cols] = await db.query('DESCRIBE events');
            console.log('Current columns:', cols.map(c => c.Field));
        } catch (e) {
            console.log('Table might not exist:', e.message);
        }

        console.log('Dropping events table...');
        await db.query('DROP TABLE IF EXISTS events');

        console.log('Recreating events table...');
        // Require the creation script - actually easiest to just run the query here
        const createQuery = `
            CREATE TABLE events (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                date DATE NOT NULL,
                time TIME NOT NULL,
                location VARCHAR(255) NOT NULL,
                created_by INT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
            )
        `;
        await db.query(createQuery);
        console.log('Events table recreated successfully.');

        const [newCols] = await db.query('DESCRIBE events');
        console.log('New columns:', newCols.map(c => c.Field));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        process.exit();
    }
}

fixSchema();
