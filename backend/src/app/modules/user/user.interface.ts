import { RowDataPacket } from "mysql2";

export type IUser = {
  id: number;
  email: string;
  username: string;
  role: 'admin' | 'user'; 
  password: string;
};

export interface IUserExtended {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  created_at?: string;
  phone?: string;
  address?: string;
  bio?: string;
} 

export type IUserRow = IUser & RowDataPacket
