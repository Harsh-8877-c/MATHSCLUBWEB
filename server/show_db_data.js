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

async function showData() {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to database.');

        console.log('\n--- USERS ---');
        const [users] = await connection.query('SELECT * FROM users');
        console.table(users);

        console.log('\n--- EVENTS ---');
        const [events] = await connection.query('SELECT * FROM events');
        console.table(events);

    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        if (connection) await connection.end();
        process.exit();
    }
}

showData();
