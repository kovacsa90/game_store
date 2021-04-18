import React, { memo, FC } from "react";
import Button from "../../Button/Button";
import { getButtonDetails } from "../utils";
import "../sharedCellStyles.css";
import "./styles.css";

interface ButtonCellProps {
  onClick: () => void;
  isSelected: boolean;
  isCheckout: boolean;
}

const ButtonCell: FC<ButtonCellProps> = memo(
  ({ onClick, isSelected, isCheckout }: ButtonCellProps) => {
    const { variant, icon, buttonText } = getButtonDetails(
      isSelected,
      isCheckout
    );

    return (
      <div className="ButtonCell-container">
        <Button variant={variant} color="primary" icon={icon} onClick={onClick}>
          {buttonText}
        </Button>
      </div>
    );
  }
);

export default ButtonCell;
