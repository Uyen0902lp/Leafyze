import { IUser, IUserExtended } from "@/types/user-d-t";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

// Define the types for the state
interface AuthState {
  accessToken?: string;
  user?: IUserExtended | undefined;
}
// Define the initial state
const initialState: AuthState = {
  accessToken: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action: PayloadAction<{ accessToken: string; user: IUserExtended }>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
      Cookies.remove('userInfo');
    },
  },
});
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
