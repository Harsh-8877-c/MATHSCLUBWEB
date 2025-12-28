```javascript
const db = require('./db');

async function showCreate() {
    try {
        const fs = require('fs');
        const [rows] = await db.query("SHOW CREATE TABLE users");
        const schema = rows[0]['Create Table'];
        console.log(schema);
        fs.writeFileSync('schema.txt', schema);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

showCreate();
