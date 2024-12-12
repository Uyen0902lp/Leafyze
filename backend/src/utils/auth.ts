import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import secret from '../config/secret';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export const comparePasswords = async (password: string,hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
}

export const generateToken = (userId: number, role: string): string => {
  return jwt.sign(
    { id: userId, role },
    secret.jwt.secret as string,
    {
      expiresIn: secret.jwt.expires_in,
    }
  );
};
