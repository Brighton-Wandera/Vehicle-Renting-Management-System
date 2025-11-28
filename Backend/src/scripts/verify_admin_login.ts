import { getDbPool, initDatabaseConnection } from '../db/dbconfig';
import bcrypt from 'bcrypt';

async function verifyAdmin() {
    try {
        console.log('Connecting to database...');
        const pool = await initDatabaseConnection();
        console.log('Connected.');

        const email = 'alfiejay881@gmail.com';
        const passwordToCheck = 'alfie_0924';

        console.log(`Checking user: ${email}`);
        const result = await pool.request()
            .input('email', email)
            .query("SELECT * FROM Users WHERE email = @email");

        if (result.recordset.length === 0) {
            console.log('❌ User NOT found in database!');
        } else {
            const user = result.recordset[0];
            console.log('✅ User found:');
            console.log(`   ID: ${user.user_id}`);
            console.log(`   Role: ${user.role}`);
            console.log(`   Stored Hash: ${user.password}`);

            console.log(`Verifying password: '${passwordToCheck}'...`);
            const isMatch = await bcrypt.compare(passwordToCheck, user.password);

            if (isMatch) {
                console.log('✅ Password MATCHES! Login should work.');
            } else {
                console.log('❌ Password does NOT match stored hash.');

                // Generate a new hash to see what it should be
                const newHash = await bcrypt.hash(passwordToCheck, 10);
                console.log(`   Expected hash for '${passwordToCheck}': ${newHash}`);
            }
        }

    } catch (err) {
        console.error('Error:', err);
    }
    process.exit();
}

verifyAdmin();
