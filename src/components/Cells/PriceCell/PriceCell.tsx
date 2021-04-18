import React, { memo, FC } from "react";
import { useCurrency } from "../../../contexts/CurrencyContext";
import { getAdjustedPrice } from "../utils";
import "../sharedCellStyles.css";
import "./styles.css";

interface PriceCellProps {
  price: number;
}

const PriceCell: FC<PriceCellProps> = memo(({ price }: PriceCellProps) => {
  const { currency, rate } = useCurrency();
  const adjustedPrice = getAdjustedPrice(price, rate, currency);
  return <div className="PriceCell-value">{adjustedPrice}</div>;
});

export default PriceCell;
