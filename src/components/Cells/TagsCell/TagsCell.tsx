import React, { memo, FC } from "react";
import "../sharedCellStyles.css";
import "./styles.css";

interface TagsCellProps {
  tags: string[];
}

const TagsCell: FC<TagsCellProps> = memo(({ tags }: TagsCellProps) => {
  const tagList = tags.map((tag) => {
    return (
      <div key={tag} className="Tag-item">
        {tag}
      </div>
    );
  });
  return (
    <div className="Cell-common-container Tags-container">
      <div className="Cell-common-text">Tags</div>
      <div className="Tags-list">{tagList}</div>
    </div>
  );
});

export default TagsCell;
