'use client';
import { IContactFormData } from "@/types/form-d-t";
import { contactSchema } from "@/utils/schema";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import ErrMsg from "../err-msg";

export default function ContactForm() {
  const {register,handleSubmit,formState: { errors },reset} = useForm<IContactFormData>({
    resolver: yupResolver(contactSchema),
  });
  const onSubmit = async (values: IContactFormData) => {
    console.log("Form Submitted", values);
    reset();
  }
  return (
    <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-contact-input-wrapper">
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input
              {...register("name",{required: true})}
              name="name"
              id="name"
              type="text"
              placeholder="Aurora Smith"
            />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="name">Your Name</label>
          </div>
          <ErrMsg msg={errors.name?.message as string} />
        </div>
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input
              {...register("email",{required: true})}
              name="email"
              id="email"
              type="email"
              placeholder="leafyze@mail.com"
            />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="email">Your Email</label>
          </div>
          <ErrMsg msg={errors.email?.message as string} />
        </div>
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <input
              {...register("subject",{required: true})}
              name="subject"
              id="subject"
              type="text"
              placeholder="Write your subject"
            />
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="subject">Subject</label>
          </div>
          <ErrMsg msg={errors.subject?.message as string} />
        </div>
        <div className="tp-contact-input-box">
          <div className="tp-contact-input">
            <textarea
              {...register("msg",{required: true})}
              id="msg"
              name="msg"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          <div className="tp-contact-input-title">
            <label htmlFor="msg">Your Message</label>
          </div>
          <ErrMsg msg={errors.msg?.message as string} />
        </div>
      </div>
      <div className="tp-contact-suggetions mb-20">
        <div className="tp-contact-remeber">
          <input id="remeber" type="checkbox" />
          <label htmlFor="remeber">
            Save my name, email, and website in this browser for the next time I
            contact.
          </label>
        </div>
      </div>
      <div className="tp-contact-btn">
        <button type="submit">Send Message</button>
      </div>
    </form>
  );
}
