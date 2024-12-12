import { Metadata } from "next";
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Wrapper from "@/layouts/wrapper";
import HeaderArea from "@/layouts/header/header-area";
import BreadcrumbArea from "@/components/breadcrumb/breadcrumb-area";
import LoginForm from "@/components/form/login-form";
import Footer from "@/layouts/footer/footer";

// shapes
import shape_1 from "@/assets/images/login/login-shape-1.png";
import shape_2 from "@/assets/images/login/login-shape-2.png";
import shape_3 from "@/assets/images/login/login-shape-3.png";
import shape_4 from "@/assets/images/login/login-shape-4.png";

export const metadata: Metadata = {
  title: "Login page - Leafyze",
};

function Shape({ id, imgSrc }: { id: string; imgSrc: StaticImageData }) {
  return <Image className={`tp-login-shape-${id}`} src={imgSrc} alt="shape" />;
}
export default function LoginPage() {
  return (
    <Wrapper>
      {/* header area */}
      <HeaderArea />
      {/* header area */}

      <main>
        {/* breadcrumb area */}
        <BreadcrumbArea
          top_cls="pt-100 pb-50"
          title="Register Now"
          subtitle="Register"
          center={true}
        />
        {/* breadcrumb area */}

        {/* register area */}
        <section className="tp-login-area pb-140 p-relative z-index-1 fix">
          <div className="tp-login-shape">
            <Shape id="1" imgSrc={shape_1} />
            <Shape id="2" imgSrc={shape_2} />
            <Shape id="3" imgSrc={shape_3} />
            <Shape id="4" imgSrc={shape_4} />
          </div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8">
                <div className="tp-login-wrapper">
                  <div className="tp-login-top text-center mb-30">
                    <h3 className="tp-login-title">Sign in Leafyze.</h3>
                    <p>
                       Don’t have an account?{" "}
                      <Link href="/register">Create a free account</Link>
                    </p>
                  </div>
                  <div className="tp-login-option">
                    <div className="tp-login-mail text-center mb-40">
                      <p>
                        Sign in with <a href="#">Email</a>
                      </p>
                    </div>
                    {/* form area */}
                    <LoginForm />
                    {/* form area */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* register area */}
      </main>

      {/* footer area */}
      <Footer />
      {/* footer area */}
    </Wrapper>
  );
}
