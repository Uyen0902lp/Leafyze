export type IUser = {
  id: number;
  email: string;
  username: string;
  role?: "admin" | "user";
  password: string;
};
export type ILoginUser = {
  email: string;
  password: string;
};

export type IUserInfo = {
  accessToken: string;
  user: IUserExtended;
}

export type IUpdateUser = {
  username: string;
  email: string;
  phone?: string;
  role?: "admin" | "user";
  address?: string;
  bio?: string;
};

export type IChangePass = {
  currentPassword:string;
  newPassword:string
}

export type IUserExtended = {
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
