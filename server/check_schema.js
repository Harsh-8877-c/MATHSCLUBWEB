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

async function checkSchema() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('DESCRIBE events');
        console.log('Events Table Schema:');
        console.table(rows);
        await connection.end();
    } catch (e) {
        console.error(e);
    }
}

checkSchema();
