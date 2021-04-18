import React, { memo, FC } from "react";
import { ReactComponent as Add } from "../../../assets/icons/add.svg";
import { ReactComponent as Subtact } from "../../../assets/icons/subtract.svg";
import "../sharedCellStyles.css";
import "./styles.css";

interface QuantityCellProps {
  quantity: number;
  handleChange: (type: string) => void;
}

const QuantityCell: FC<QuantityCellProps> = memo(
  ({ quantity, handleChange }: QuantityCellProps) => {
    return (
      <div className="Cell-common-container Quantity-container">
        <div className="Cell-common-text">Quantity</div>
        <div className="Quantity-counter">
          <Subtact
            color="#303550"
            cursor="pointer"
            onClick={() => handleChange("subtract")}
          />
          <div className="Quantity-counter-value">{quantity}</div>
          <Add
            color="#303550"
            cursor="pointer"
            onClick={() => handleChange("add")}
          />
        </div>
      </div>
    );
  }
);

export default QuantityCell;
