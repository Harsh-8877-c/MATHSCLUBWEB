const db = require('./db');

async function initDB() {
    const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('Student', 'Coordinator', 'ClubMember', 'Admin') NOT NULL DEFAULT 'Student',
      is_approved BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

    try {
        const [result] = await db.query(createUsersTable);
        console.log("Users table created successfully or already exists.", result);
        process.exit(0);
    } catch (err) {
        console.error("Error creating database schema:", err);
        process.exit(1);
    }
}

initDB();
