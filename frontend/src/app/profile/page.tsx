import React from "react";
import { Metadata } from "next";
import Wrapper from "@/layouts/wrapper";
import HeaderArea from "@/layouts/header/header-area";
import Footer from "@/layouts/footer/footer";
import ProfileArea from "@/components/profile/profile-area";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile page - Leafyze",
};

export default function ProfilePage() {
  const cookieStore = cookies()
  const user = cookieStore.get('userInfo');
  if(!user){
    redirect('/login')
  }
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      {/* profile area */}
      <ProfileArea/>
      {/* profile area */}

      {/* footer area */}
      <Footer/>
      {/* footer area */}
    </Wrapper>
  );
}
