import React from "react";
import { WorkFour, WorkOne, WorkThree, WorkTwo } from "../svg";

const work_data = [
  {
    id: 1,
    icon: <WorkOne />,
    title: "Solutions for <br/> Every Plant Lover",
  },
  {
    id: 2,
    icon: <WorkTwo />,
    title: "Your Partner in <br/> Green Growth",
  },
  {
    id: 3,
    icon: <WorkThree />,
    title: "Explore Remedies <br/> for Every Need",
  },
  {
    id: 4,
    icon: <WorkFour />,
    title: "Quality Sourced <br/> and Sustainable",
  },
];

export default function AboutWorkArea() {
  return (
    <section className="tp-work-area pt-115 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="tp-work-section-title-wrapper text-center mb-60">
              <h3 className="tp-work-section-title">
                Take a Look at our <br /> {"Team's"} Work
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          {work_data.map((item) => (
            <div className="col-lg-3 col-sm-6" key={item.id}>
              <div className="tp-work-item mb-35 text-center">
                <div className="tp-work-icon d-flex align-items-end justify-content-center">
                  <span>{item.icon}</span>
                </div>
                <div className="tp-work-content">
                  <h3
                    className="tp-work-title"
                    dangerouslySetInnerHTML={{ __html: item.title }}
                  ></h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-4">
            <div className="tp-work-quote text-center">
              <p>
                So start browsing today and discover eco-friendly products <br /> 
                to nurture and support your plant care journey!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
