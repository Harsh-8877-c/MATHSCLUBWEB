const db = require('./db');

async function initDB() {
  console.log("Attempting to connect with:");
  console.log("Host:", process.env.DB_HOST);
  console.log("User:", process.env.DB_USER);
  console.log("Database:", process.env.DB_NAME);
  console.log("SSL:", process.env.DB_SSL);
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
    console.error("Error creating database schema:");
    console.error(JSON.stringify(err, null, 2));
    console.error("Full Message:", err.message);
    process.exit(1);
  }
}

initDB();
