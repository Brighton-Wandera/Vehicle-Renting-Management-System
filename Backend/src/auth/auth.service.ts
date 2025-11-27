import { getDbPool } from '../db/dbconfig';
import bcrypt from 'bcrypt';

export const registerUserService = async (user: any) => {
  const db = getDbPool();

  // 1. Check if email exists
  const checkQuery = 'SELECT email FROM Users WHERE email = @email';
  const checkResult = await db.request().input('email', user.email).query(checkQuery);

  if (checkResult.recordset.length > 0) {
    return null; // User already exists
  }

  // 2. Hash Password
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // 3. Insert User
  const insertQuery = `
    INSERT INTO Users (first_name, last_name, email, password, contact_phone, address, role)
    VALUES (@first_name, @last_name, @email, @password, @contact_phone, @address, @role)
  `;

  await db.request()
    .input('first_name', user.first_name)
    .input('last_name', user.last_name)
    .input('email', user.email)
    .input('password', hashedPassword)
    .input('contact_phone', user.contact_phone)
    .input('address', user.address || '')
    .input('role', user.role || 'user')
    .query(insertQuery);

  return 'User registered successfully';
};

export const loginUserService = async (email: string) => {
  const db = getDbPool();
  const query = 'SELECT * FROM Users WHERE email = @email';
  const result = await db.request().input('email', email).query(query);
  return result.recordset[0] || null;
};