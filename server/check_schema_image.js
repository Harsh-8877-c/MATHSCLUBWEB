const db = require('./db');
async function check() {
    try {
        const [rows] = await db.query('DESCRIBE events');
        console.log('Columns matching "image":');
        rows.filter(r => r.Field.toLowerCase().includes('image')).forEach(r => console.log(r));

        console.log('All Columns:');
        rows.forEach(r => console.log(r.Field));

    } catch (e) { console.error(e); }
    process.exit();
}
check();
