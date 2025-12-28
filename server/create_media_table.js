const db = require('./db');

async function createMediaTable() {
    try {
        console.log('Creating event_media table...');
        const connection = await db.getConnection();

        await connection.query(`
            CREATE TABLE IF NOT EXISTS event_media (
                id INT AUTO_INCREMENT PRIMARY KEY,
                event_id INT NOT NULL,
                url VARCHAR(500) NOT NULL,
                type ENUM('image', 'video') DEFAULT 'image',
                caption VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
            )
        `);
        console.log('- event_media created');

        connection.release();

    } catch (err) {
        console.error('Error creating table:', err);
    } finally {
        process.exit();
    }
}

createMediaTable();
