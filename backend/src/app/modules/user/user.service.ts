import httpStatus from 'http-status'
import pool from '../../../db'
import ApiError from '../../../errors/ApiError'
import {
  comparePasswords,
  generateToken,
  hashPassword,
} from '../../../utils/auth'
import { IUser, IUserRow, IUserExtended } from './user.interface'
import { ResultSetHeader } from 'mysql2'
import { RowDataPacket } from 'mysql2';

// user registration
const createUserService = async (user: IUser) => {
  const { username, email, password, role = 'user' } = user

  const hashedPassword = await hashPassword(password)

  // Include role in the INSERT query
  //   const [result] = await pool.query(
  //     'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
  //     [username, email, hashedPassword, role]
  //   )

  //   return result
  // Insert user into the database
  const [result] = await pool.query(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, hashedPassword, role]
  )

  // Fetch the newly created user (excluding password)
  const [rows] = await pool.query<IUserRow[]>(
    'SELECT id, username, email, role FROM users WHERE id = ?',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [(result as any).insertId]
  )

  const createdUser = rows[0]

  return createdUser
}

// user registration
const loginUserService = async (
  email: string,
  password: string
): Promise<{ token: string; user: Omit<IUser, 'password'> }> => {
  // Query to find the user by email
  const [rows] = await pool.query<IUserRow[]>(
    'SELECT * FROM users WHERE email = ?',
    [email]
  )

  // Check if user exists
  if (rows.length === 0) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password')
  }

  const user = rows[0]

  // Validate the password
  const isPasswordValid = await comparePasswords(password, user.password)
  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid email or password')
  }

  // Generate JWT token
  const token = generateToken(user.id, user.role)

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password: _, ...userWithoutPassword } = user
  return { token, user: userWithoutPassword }
}

// update user
async function updateUserService(id: number, data: Partial<IUser>) {
  const [result] = await pool.query<ResultSetHeader>(
    'UPDATE users SET ? WHERE id = ?',
    [data, id]
  )
  return result
}

// change password
const changePasswordService = async (
  userId: number,
  currentPassword: string,
  newPassword: string
) => {
  // Fetch the user by their ID
  const [rows] = await pool.query<IUserRow[]>(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  )

  // Check if user exists
  if (rows.length === 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const user = rows[0];

  // Verify current password
  const isPasswordValid = await comparePasswords(currentPassword, user.password)
  if (!isPasswordValid) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect current password')
  }

  // Hash the new password
  const hashedNewPassword = await hashPassword(newPassword)

  // Update the user's password in the database
  const result = await pool.query<ResultSetHeader>(
    'UPDATE users SET password = ? WHERE id = ?',
    [hashedNewPassword, userId]
  )

  return result;
}

// Show All Users
const showAllUsersService = async (): Promise<IUserExtended[]> => {
  const [rows] = await pool.query<IUserExtended[] & RowDataPacket[]>(
    'SELECT id, username, email, role, phone, address, bio, created_at FROM users'
  );

  return rows;
};

export const UsersService = {
  createUserService,
  loginUserService,
  updateUserService,
  changePasswordService,
  showAllUsersService,
}
