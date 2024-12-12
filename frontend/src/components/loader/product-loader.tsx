import React from "react";
import Loader from "./loader";

// prop type
type IProps = {
  loading: boolean;
};

export default function ProductLoader({ loading }: IProps) {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="col-lg-4 col-sm-6">
          <div style={{ height: 350,width: 300 }} className="d-flex align-items-center justify-content-center">
            <Loader loading={loading} />
          </div>
        </div>
      ))}
    </>
  );
}
