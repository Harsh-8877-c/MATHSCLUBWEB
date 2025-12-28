const db = require('./db');

async function createTables() {
    try {
        console.log('Creating interaction tables...');
        const connection = await db.getConnection(); // Helper if pool

        // 1. Event Media
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

        // 2. Event Feedback
        await connection.query(`
            CREATE TABLE IF NOT EXISTS event_feedback (
                id INT AUTO_INCREMENT PRIMARY KEY,
                event_id INT NOT NULL,
                user_id INT NOT NULL,
                rating INT CHECK (rating >= 1 AND rating <= 5),
                comment TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE KEY unique_feedback (event_id, user_id)
            )
        `);
        console.log('- event_feedback created');

        // 3. Event Attendance
        await connection.query(`
            CREATE TABLE IF NOT EXISTS event_attendance (
                id INT AUTO_INCREMENT PRIMARY KEY,
                event_id INT NOT NULL,
                user_id INT NOT NULL,
                status VARCHAR(50) DEFAULT 'present',
                marked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
                UNIQUE KEY unique_attendance (event_id, user_id)
            )
        `);
        console.log('- event_attendance created');

        connection.release();

    } catch (err) {
        console.error('Error creating tables:', err);
    } finally {
        process.exit();
    }
}

createTables();
