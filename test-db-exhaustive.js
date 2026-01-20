const { Pool } = require('pg');

const DATABASE_URL = "postgresql://postgres:azFpNgUrNGHkoWRuwUyqxSiWEmgNMyHh@shuttle.proxy.rlwy.net:20063/railway";

async function testMode(name, sslConfig) {
    console.log(`\n--- Testing Mode: ${name} ---`);
    const pool = new Pool({
        connectionString: DATABASE_URL,
        ssl: sslConfig,
        connectionTimeoutMillis: 5000,
    });

    try {
        console.log('Connecting...');
        const client = await pool.connect();
        console.log('✅ SUCCESS!');
        const res = await client.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'');
        console.log('Tables:', res.rows.map(r => r.table_name).join(', '));
        client.release();
        return true;
    } catch (err) {
        console.error('❌ FAILED:', err.message);
        return false;
    } finally {
        await pool.end();
    }
}

async function runAll() {
    await testMode('No SSL', false);
    await testMode('SSL Allow (No Reject)', { rejectUnauthorized: false });
    await testMode('SSL Mode Require (via URL param)', false); // URL has it already?
}

runAll();
