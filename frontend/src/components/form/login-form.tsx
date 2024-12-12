"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "@/redux/feature/authSlice";
import { CloseEye, OpenEye } from "@/components/svg";
import ErrorMsg from "@/components/err-msg";
import { loginSchema } from "@/utils/schema";
import { ILoginFormData } from "@/types/form-d-t";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { IErrorResponse } from "@/types/error-res-d-t";

const AUTH_TOKEN_KEY = "authToken";
const USER_ID_KEY = "user_id";
const USER_ROLE_KEY = "user_role";

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Submit handler
  const onSubmit = async (values: ILoginFormData) => {
    try {
      const loginData = await loginUser({
        email: values.email,
        password: values.password,
      }).unwrap();

      if (loginData.data) {
        const { token, user } = loginData.data;

        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(USER_ID_KEY, user.id.toString());
        localStorage.setItem(USER_ROLE_KEY, user.role || "user");

        dispatch(userLoggedIn({ accessToken: token, user }));

        // Redirect to home page after successful login
        router.push("/");
      }
    } catch (err) {
      const errorRes = err as IErrorResponse;

      // Check for expired JWT error
      if (errorRes.data.message === "jwt expired") {
        toast.error("Your session has expired. Please log in again.");
        localStorage.clear();
        router.push("/login");
      } else {
        toast.error(errorRes.data.message || "An unexpected error occurred.");
      }

      console.error("Login Error:", errorRes);
    } finally {
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">
        <div className="tp-login-input-box">
          <div className="tp-login-input">
            <input
              {...register("email", { required: "Email is required!" })}
              name="email"
              id="email"
              type="email"
              placeholder="leafyze@mail.com"
            />
          </div>
          <div className="tp-login-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrorMsg msg={errors.email?.message!} />
        </div>
        <div className="tp-login-input-box">
          <div className="p-relative">
            <div className="tp-login-input">
              <input
                {...register("password", { required: "Password is required!" })}
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 characters"
              />
            </div>
            <div
              className="tp-login-input-eye"
              id="password-show-toggle"
              onClick={() => setShowPass(!showPass)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setShowPass(!showPass);
                }
              }}
            >
              {showPass ? <OpenEye /> : <CloseEye />}
            </div>
            <div className="tp-login-input-title">
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <ErrorMsg msg={errors.password?.message!} />
        </div>
      </div>
      <div className="tp-login-bottom mt-30">
        <button disabled={isLoading} type="submit" className="tp-login-btn w-100">
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
