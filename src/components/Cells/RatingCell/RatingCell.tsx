import React, { memo, FC } from "react";
import { ReactComponent as Star } from "../../../assets/icons/star.svg";
import "../sharedCellStyles.css";
import "./styles.css";

interface RatingCellProps {
  rating: number;
}

const RatingCell: FC<RatingCellProps> = memo(({ rating }: RatingCellProps) => {
  const starList = [...Array(5)].map((_, idx) => {
    const starColor = idx < rating ? "#f5f5f5" : "#151829";
    return <Star key={idx} color={starColor} className="Rating-star" />;
  });
  return (
    <div className="Cell-common-container Rating-container">
      <div className="Cell-common-text">Rating</div>
      <div>{starList}</div>
    </div>
  );
});

export default RatingCell;
