import { getDbPool } from '../db/dbconfig.js'

export interface User {
  user_id: number
  first_name: string
  last_name: string
  email: string
  contact_phone: string
  address: string
  role: string
  created_at: string
}

// Get all users
export const getAllUsersService = async (): Promise<User[]> => {
  const db = getDbPool()
  const query = 'SELECT * FROM Users'
  const result = await db.request().query(query)
  return result.recordset
}

// Get user by ID
export const getUserByIdService = async (user_id: number): Promise<User | null> => {
  const db = getDbPool()
  const query = 'SELECT * FROM Users WHERE user_id = @user_id'
  const result = await db.request().input('user_id', user_id).query(query)
  return result.recordset[0] || null
}

// Create user
export const createUserService = async (user: any): Promise<string> => {
  const db = getDbPool()
  const query = `
    INSERT INTO Users (first_name, last_name, email, password, contact_phone, address, role)
    VALUES (@first_name, @last_name, @email, @password, @contact_phone, @address, @role)
  `
  const result = await db.request()
    .input('first_name', user.first_name)
    .input('last_name', user.last_name)
    .input('email', user.email)
    .input('password', user.password) 
    .input('contact_phone', user.contact_phone)
    .input('address', user.address)
    .input('role', user.role || 'user')
    .query(query)
  return result.rowsAffected[0] === 1 ? 'User created successfully' : 'User not created' 
}

// Update user
export const updateUserService = async (user_id: number, first_name: string, last_name: string, email: string, contact_phone: string, address: string): Promise<string> => {
  const db = getDbPool()
  const query = `
    UPDATE Users 
    SET first_name = @first_name, last_name = @last_name, contact_phone = @contact_phone, address = @address
    WHERE user_id = @user_id
  `
  const result = await db.request()
    .input('user_id', user_id)
    .input('first_name', first_name)
    .input('last_name', last_name)
    .input('contact_phone', contact_phone)
    .input('address', address)
    .query(query)
  return result.rowsAffected[0] === 1 ? 'User updated successfully' : 'User not updated' 
}

// Delete user
export const deleteUserService = async (user_id: number): Promise<string> => {
  const db = getDbPool()
  const query = 'DELETE FROM Users WHERE user_id = @user_id'
  const result = await db.request().input('user_id', user_id).query(query)
  return result.rowsAffected[0] === 1 ? 'User deleted successfully' : 'User not deleted'
}