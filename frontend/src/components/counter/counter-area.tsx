'use client';
import React from "react";
import { Achievements, Customers, Founding, OrderTruck } from "../svg";

const counter_data = [
  {
    id: 1,
    icon: <Customers />,
    count: 750,
    text: "+",
    title: "Happy Customers",
  },
  {
    id: 2,
    icon: <Founding />,
    count: 2020,
    text: "",
    title: "Founding Year",
  },
  {
    id: 3,
    icon: <OrderTruck />,
    count: 3000,
    text: "+",
    title: "Predictions Made",
  },
  {
    id: 4,
    icon: <Achievements />,
    count: 90,
    text: "%",
    title: "Model Accuracy",
  },
];

export default function CounterArea() {
  return (
    <section className="tp-counter-area pb-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="tp-counter-wrapper d-flex flex-wrap justify-content-between">
              {counter_data.map((item) => (
                <div
                  className="tp-counter-item d-flex align-items-start mb-30"
                  key={item.id}
                >
                  <div className="tp-counter-icon mr-15">
                    <span>{item.icon}</span>
                  </div>
                  <div className="tp-counter-content">
                    <h4>
                      <span className="purecounter">{item.count}</span>
                      {item.text}
                    </h4>
                    <p>{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
