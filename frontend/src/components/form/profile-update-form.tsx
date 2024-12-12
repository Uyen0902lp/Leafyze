"use client";
import React from "react";
import { IUpdateProfileFormData } from "@/types/form-d-t";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ErrMsg from "../err-msg";
import { useAppSelector } from "@/redux/hook";
import { EmailTwo, LocationTwo, Phone, UserThree } from "../svg";
import { useUpdateUserMutation } from "@/redux/api/authApi";
import { IErrorResponse } from "@/types/error-res-d-t";

export default function ProfileUpdateForm() {
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUpdateProfileFormData>({
    defaultValues: {
      name: user?.username || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      bio: user?.bio || "",
    },
  });

  const [updateUser] = useUpdateUserMutation();

  const onSubmit: SubmitHandler<IUpdateProfileFormData> = async (data) => {
    if (!user?.id) {
      toast.error("Please login first");
      return;
    }
    try {
      const updateData = await updateUser({
        id: user.id,
        user: {
          username: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          bio: data.bio,
          role: user.role, // Ensure role is passed
        },
      }).unwrap();

      toast.success(updateData.message);

      // Update the form with new values
      reset(data);
    } catch (error) {
      const errRes = error as IErrorResponse;
      toast.error(errRes.data.message as string);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-xxl-6 col-md-6">
          <div className="profile__input-box">
            <div className="profile__input">
              <input
                {...register("name", { required: "Name is required!" })}
                type="text"
                placeholder="Enter your username"
              />
              <span>
                <UserThree />
              </span>
              {errors?.name?.message && <ErrMsg msg={errors.name.message} />}
            </div>
          </div>
        </div>

        <div className="col-xxl-6 col-md-6">
          <div className="profile__input-box">
            <div className="profile__input">
              <input
                {...register("email", { required: "Email is required!" })}
                type="email"
                placeholder="Enter your email"
              />
              <span>
                <EmailTwo />
              </span>
              {errors?.email?.message && <ErrMsg msg={errors.email.message} />}
            </div>
          </div>
        </div>

        <div className="col-xxl-12">
          <div className="profile__input-box">
            <div className="profile__input">
              <input
                {...register("phone")}
                type="text"
                placeholder="Enter your number"
              />
              <span>
                <Phone />
              </span>
            </div>
          </div>
        </div>

        <div className="col-xxl-12">
          <div className="profile__input-box">
            <div className="profile__input">
              <input
                {...register("address")}
                type="text"
                placeholder="Enter your address"
              />
              <span>
                <LocationTwo />
              </span>
            </div>
          </div>
        </div>

        <div className="col-xxl-12">
          <div className="profile__input-box">
            <div className="profile__input">
              <textarea
                {...register("bio")}
                placeholder="Enter your bio"
              />
            </div>
          </div>
        </div>
        <div className="col-xxl-12">
          <div className="profile__btn">
            <button type="submit" className="tp-btn">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
