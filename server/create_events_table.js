const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Harshx5274',
    database: process.env.DB_NAME || 'math_club',
    port: process.env.DB_PORT || 3306
};

async function createEventsTable() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to database.');

        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS events (
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

        await connection.execute(createTableQuery);
        console.log('Events table created or already exists.');

    } catch (error) {
        console.error('Error creating events table:', error);
    } finally {
        if (connection) await connection.end();
    }
}

createEventsTable();
