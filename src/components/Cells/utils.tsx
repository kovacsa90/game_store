import React from "react";
import { ReactComponent as Check } from "../../assets/icons/check.svg";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";

export const transformDate = (data: string) => {
  const date = new Date(data);
  const longMonth = date.toLocaleDateString("en-GB", { month: "long" });
  const fullYear = date.getFullYear();
  const day = date.getDate();
  return `${longMonth} ${day}, ${fullYear}`;
};

type ButtonDetails = {
  variant: "secondary" | "primary";
  icon: React.ReactElement;
  buttonText: "REMOVE" | "ADDED" | "ADD TO BASKET";
};

export const getButtonDetails = (
  isSelected: boolean,
  isCheckout: boolean
): ButtonDetails => {
  if (isCheckout) {
    return { variant: "secondary", icon: <Trash />, buttonText: "REMOVE" };
  }
  if (isSelected) {
    return { variant: "secondary", icon: <Check />, buttonText: "ADDED" };
  }
  return {
    variant: "primary",
    icon: <Plus />,
    buttonText: "ADD TO BASKET",
  };
};

export const getAdjustedPrice = (
  price: number,
  rate: number,
  currency: "USD" | "EUR" | "GBP"
) => {
  const currencySignMap = { USD: "$", EUR: "€", GBP: "£" };
  const currencySign = currencySignMap[currency];
  return `${(price * rate).toFixed(2)} ${currencySign}`;
};
