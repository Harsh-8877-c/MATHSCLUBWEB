require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
    console.log("--- Testing Cloud Database Connection ---");
    console.log("Host:", process.env.DB_HOST);
    console.log("User:", process.env.DB_USER);
    console.log("Port:", process.env.DB_PORT);
    console.log("Database:", process.env.DB_NAME);
    console.log("SSL Enabled:", process.env.DB_SSL === 'true');
    console.log("Password Length:", process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : 0);

    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
        connectTimeout: 10000
    };

    try {
        console.log("\nAttempting to connect...");
        const connection = await mysql.createConnection(config);
        console.log("✅ Connection SUCCESSFUL!");

        const [rows] = await connection.execute('SELECT 1 + 1 AS solution');
        console.log("Query Test:", rows[0].solution === 2 ? "Passed" : "Failed");

        await connection.end();
        process.exit(0);
    } catch (err) {
        console.error("\n❌ Connection FAILED");
        console.error("Error Code:", err.code);
        console.error("Error Message:", err.message);
        console.error("Full Error:", err);
        process.exit(1);
    }
}

testConnection();
