"use client";
import React from "react";
import { IChangePassFormData } from "@/types/form-d-t";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ErrMsg from "../err-msg";
import { useAppSelector } from "@/redux/hook";
import { IErrorResponse } from "@/types/error-res-d-t";
import { useChangePasswordMutation } from "@/redux/api/authApi";

export default function ChangePassForm() {
  const { user } = useAppSelector((state) => state.auth);
  const {register,handleSubmit,formState: { errors },reset} = useForm<IChangePassFormData>();
  const [changePassword] = useChangePasswordMutation();

  const onSubmit: SubmitHandler<IChangePassFormData> = async (data) => {
    try {
        if(!user?.id){
            toast.error('Please login first');
            return;
        }
        else {
            const changePassData = await changePassword({
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            }).unwrap();
            if(changePassData){
                toast.success(changePassData?.message);
                reset();
            }
        }
    } catch(error) {
        const errRes = error as IErrorResponse;
        toast.error(errRes.data.message as string);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-xxl-6 col-md-6">
            <div className="tp-profile-input-box">
              <div className="tp-profile-input">
                <input
                  {...register("currentPassword", {
                    required: `Current password is required!`,
                    minLength:{
                        message:"Current password must be at least 6 characters",
                        value:6
                    }
                  })}
                  name="currentPassword"
                  id="currentPassword"
                  type="password"
                />
              </div>
              <div className="tp-profile-input-title">
                <label htmlFor="currentPassword">Current Password</label>
              </div>
              {errors?.currentPassword?.message && <ErrMsg msg={errors.currentPassword.message} />}
            </div>
          </div>
          <div className="col-xxl-6 col-md-6">
            <div className="tp-profile-input-box">
              <div className="tp-profile-input">
                <input
                  {...register("newPassword", {
                    required: `New password is required!`,
                    minLength:{
                        message:"New password must be at least 6 characters",
                        value:6
                    }
                  })}
                  name="newPassword"
                  id="newPassword"
                  type="password"
                />
              </div>
              <div className="tp-profile-input-title">
                <label htmlFor="newPassword">New Password</label>
              </div>
              {errors?.newPassword?.message && <ErrMsg msg={errors.newPassword.message} />}
            </div>
          </div>
          <div className="col-xxl-6 col-md-6">
            <div className="profile__btn">
              <button type="submit" className="tp-btn">
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
  )
}
