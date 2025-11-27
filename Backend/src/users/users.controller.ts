import { type Context } from 'hono'
import * as userService from './users.service.js'

export const getAllUsers = async (c: Context) => {
  try {
    const result = await userService.getAllUsersService()
    if(result.length === 0){
      return c.json({message: 'Users not found'})
    }
    return c.json(result)
  } catch (error: any) {
    return c.json({ error: 'Server Not Found' }, 500)
  }
}

export const getUserById = async (c: Context) => {
  const id = parseInt(c.req.param('id'))
  try {
    const result = await userService.getUserByIdService(id)
    if (result === null){
      return c.json({ message: 'User not found' }, 404)
    } 
    return c.json(result)
  } catch (error: any) {
    return c.json({ error: 'server not found' }, 500)
  }
}

export const createUser = async (c: Context) => {
  try {
    const user = await c.req.json() as {user_id: number, first_name: string, last_name: string, email: string, password:string, contact_phone: string, address: string, role:string}

    const result = await userService.createUserService(user)
    if (result === 'User not created'){
      return c.json({error: 'failed to create user'})
    }
    return c.json({ message: 'User created successfully'}, 201)
  } catch (error: any) {
    return c.json({ error: 'server not found' }, 500)
  }
}

export const updateUser = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'))
    const user = await c.req.json() 
    const check = await userService.getUserByIdService(id)
    if (check === null){
      return c.json({error: 'user not found'})
    }
    const result = await userService.updateUserService(id, user.first_name, user.last_name, user.email, user.contact_phone, user.address)
    if (result === 'User not updated'){
      return c.json({error: 'user failed to update'}, 400)
    }
    return c.json({ message: 'User updated successfully'}, 200) 

  } catch (error: any) {
    return c.json({ error: 'Server not found'}, 500)
  }
}

export const deleteUser = async (c: Context) => {
  try {
    const id = parseInt(c.req.param('id'))
    const check = await userService.getUserByIdService(id)
    if (check === null){
      return c.json({error: 'User not found'})
    }
    const result = await userService.deleteUserService(id)
    if (result === 'User not deleted'){
      return c.json({error: 'failed to delete user'}, 401)
    }
    return c.json({ message: 'User deleted successfully' }, 200)
  } catch (error: any) {
    return c.json({ error: 'server not found' }, 500)
  }
}