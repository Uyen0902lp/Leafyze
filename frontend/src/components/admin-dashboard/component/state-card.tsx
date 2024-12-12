import React from "react";
import {
  MdLocalPolice,
  MdOutlineGrass,
  MdInsights,
  MdBugReport,
  MdAddShoppingCart
} from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import { LuPackageX } from "react-icons/lu";
import { RiDiscountPercentFill } from "react-icons/ri";

const getIcon = (icon: string) => {
  switch (icon) {
    case "class-count":
      return <MdOutlineGrass size={24} />;
    case "high-accuracy":
      return <MdLocalPolice size={24} />;
    case "total-predictions":
      return <MdInsights size={24} />;
    case "discounted-products":
      return <RiDiscountPercentFill size={24} />;
    case "potential-revenue":
      return <TbPigMoney size={24} />;
    case "out-of-stock":
      return <LuPackageX size={24} />;
    case "total-products":
      return <MdAddShoppingCart size={24} />;
    default:
      return <MdBugReport size={24} />;
  }
};

type StateCardProps = {
  data: {
    title: string;
    value: number;
    growth: number;
    icon: string;
    color: string;
    format?: "currency" | "decimal";
  };
};

const StateCard: React.FC<StateCardProps> = ({ data }) => {
  const formattedValue =
    data.format === "currency"
      ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(data.value as number)
      : new Intl.NumberFormat("en-US").format(data.value as number);

  return (
    <div className="state-card">
      <div className="state-card-icon" style={{ backgroundColor: data.color }}>
        {getIcon(data.icon)}
      </div>
      <div className="state-card-content">
        <h4 className="state-card-title">{data.title}</h4>
        <p className="state-card-value">{formattedValue}</p>
      </div>
    </div>
  );
};

export default StateCard;
