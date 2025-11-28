import { getDbPool, initDatabaseConnection } from '../db/dbconfig';
import bcrypt from 'bcrypt';

const resetAdmin = async () => {
    try {
        const email = 'alfiejay881@gmail.com';
        const password = 'alfie_0924';
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Initializing DB connection...');
        const pool = await initDatabaseConnection();
        console.log('Connected to database.');

        // 1. Try to find the default admin 'admin@example.com' to replace
        let result = await pool.request()
            .query("SELECT * FROM Users WHERE email = 'admin@example.com'");

        if (result.recordset.length > 0) {
            // Update the default admin to the new credentials
            await pool.request()
                .input('email', email)
                .input('password', hashedPassword)
                .query("UPDATE Users SET email = @email, password = @password WHERE email = 'admin@example.com'");
            console.log('Successfully updated default admin to new credentials.');
        } else {
            // 2. Check if the target email already exists
            result = await pool.request()
                .input('email', email)
                .query("SELECT * FROM Users WHERE email = @email");

            if (result.recordset.length > 0) {
                // Update existing user to be admin with new password
                await pool.request()
                    .input('email', email)
                    .input('password', hashedPassword)
                    .query("UPDATE Users SET password = @password, role = 'admin', is_verified = 1 WHERE email = @email");
                console.log('Successfully updated existing user to admin role with new password.');
            } else {
                // 3. Create new admin user
                await pool.request()
                    .input('first_name', 'Admin')
                    .input('last_name', 'User')
                    .input('email', email)
                    .input('password', hashedPassword)
                    .input('contact_phone', '0700000000')
                    .input('address', 'Admin HQ')
                    .input('role', 'admin')
                    .query(`
                        INSERT INTO Users (first_name, last_name, email, password, contact_phone, address, role, is_verified)
                        VALUES (@first_name, @last_name, @email, @password, @contact_phone, @address, @role, 1)
                    `);
                console.log('Successfully created new admin user.');
            }
        }

        console.log('----------------------------------------');
        console.log('Admin Login Credentials:');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('----------------------------------------');

    } catch (error) {
        console.error('Error resetting admin credentials:', error);
    }
    process.exit();
};

resetAdmin();
