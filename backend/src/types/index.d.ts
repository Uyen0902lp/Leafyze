import { IUser } from "../app/modules/user/user.interface";

declare global {
    namespace Express {
      type Request = {
        user?: IUser; 
      }
    }
  }