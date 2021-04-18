import React, { memo, FC } from "react";
import { transformDate } from "../utils";
import "../sharedCellStyles.css";
import "./styles.css";

interface DetailsCellProps {
  artworkUrl: string;
  releaseDate: string;
  name: string;
}

const DetailsCell: FC<DetailsCellProps> = memo(
  ({ artworkUrl, releaseDate, name }: DetailsCellProps) => {
    const transformedDate = transformDate(releaseDate);
    const expandedRelease = `Released - ${transformedDate}`;
    return (
      <div className="Details-container">
        <img src={artworkUrl} alt={name} className="Details-image" />
        <div className="Cell-common-container">
          <div className="Cell-common-text">{expandedRelease}</div>
          <div className="Details-text-title">{name}</div>
        </div>
      </div>
    );
  }
);

export default DetailsCell;
