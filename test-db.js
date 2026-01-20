const { Pool } = require('pg');
require('dotenv').config();

const DATABASE_URL = "postgresql://postgres:azFpNgUrNGHkoWRuwUyqxSiWEmgNMyHh@shuttle.proxy.rlwy.net:20063/railway";

console.log('Testing connection to:', DATABASE_URL.replace(/:[^:@]*@/, ':****@'));

async function test() {
    const pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: false,
    });

    try {
        console.log('Connecting...');
        const client = await pool.connect();
        console.log('Successfully connected!');

        console.log('Querying users table...');
        const res = await client.query('SELECT COUNT(*) FROM users');
        console.log('User count:', res.rows[0].count);

        client.release();
    } catch (err) {
        console.error('Connection error details:', err.message);
        console.error('Stack:', err.stack);
    } finally {
        await pool.end();
    }
}

test();
