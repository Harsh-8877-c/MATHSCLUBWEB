const db = require('./db');

async function checkAdmins() {
    try {
        const [users] = await db.query("SELECT id, full_name, email, role, is_approved FROM users WHERE role = 'Admin'");
        console.log('Admin Users found:', users.length);
        console.table(users);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkAdmins();
