import 'dotenv/config';
import postgres from 'postgres';

const {DATABASE_URL} = process.env;
console.log('DATABASE_URL:', DATABASE_URL);

async function test() {
    try {
        const sql = postgres(DATABASE_URL);
        const result = await sql`SELECT 1 as test`;
        console.log('Connection successful:', result);
        sql.end();
    } catch (error) {
        console.error('Connection error:', error);
    }
}

test();