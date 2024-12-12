import React from "react";
import Link from "next/link";

// prop type
type IProps = {
  title: string;
  subtitle: string;
  top_cls?: string;
  center?: boolean;
  bg_clr?: string;
};

export default function BreadcrumbArea({
  title,
  subtitle,
  top_cls = "pt-95 pb-50",
  center = false,
  bg_clr,
}: IProps) {
  return (
    <section
      className={`breadcrumb__area include-bg ${top_cls}`}
      style={{ backgroundColor: bg_clr ? bg_clr : "" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xxl-12">
            <div
              className={`breadcrumb__content p-relative z-index-1 ${
                center ? "text-center" : ""
              }`}
            >
              <h3 className="breadcrumb__title">{title}</h3>
              <div className="breadcrumb__list">
                <span>
                  <Link href="/">Home</Link>
                </span>
                <span>{subtitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
