import React, { FC, memo } from "react";
import "./styles.css";

const Select: FC<{
  value: any;
  onChange: any;
  options: {
    label: string;
    value: any;
  }[];
}> = ({ value, onChange, options }) => {
  return (
    <select
      className="Select-container"
      data-testid="selectCurrency"
      value={value}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <option key={option.value + index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default memo(Select);
