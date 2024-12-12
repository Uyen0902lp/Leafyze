"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { userLoggedIn } from "@/redux/feature/authSlice";
import { IUserInfo } from "@/types/user-d-t";
import { useAppDispatch } from "@/redux/hook";

export default function useAuthCheck() {
  const dispatch = useAppDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const localAuth = Cookies.get("userInfo");

    if (localAuth) {
      const auth:IUserInfo = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user) {
        dispatch(
          userLoggedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);

  return authChecked;
}
