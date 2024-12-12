import { Metadata } from "next";
import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Wrapper from "@/layouts/wrapper";
import HeaderArea from "@/layouts/header/header-area";
import Footer from "@/layouts/footer/footer";
import BreadcrumbArea from "@/components/breadcrumb/breadcrumb-area";
import RegisterForm from "@/components/form/register-form";

// shapes
import shape_1 from "@/assets/images/login/login-shape-1.png";
import shape_2 from "@/assets/images/login/login-shape-2.png";
import shape_3 from "@/assets/images/login/login-shape-3.png";
import shape_4 from "@/assets/images/login/login-shape-4.png";

export const metadata: Metadata = {
  title: "Register page",
};

function Shape({ id, imgSrc }: { id: string; imgSrc: StaticImageData }) {
  return <Image className={`tp-login-shape-${id}`} src={imgSrc} alt="shape" />;
}
export default function RegisterPage() {
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
                    <h3 className="tp-login-title">Sign Up Leafyze.</h3>
                    <p>
                      Already have an account?{" "}
                      <span>
                        <Link href="/login">Sign In</Link>
                      </span>
                    </p>
                  </div>
                  <div className="tp-login-option">
                    <div className="tp-login-mail text-center mb-40">
                      <p>
                        Sign up with <a href="#">Email</a>
                      </p>
                    </div>
                    {/* form area */}
                    <RegisterForm />
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
