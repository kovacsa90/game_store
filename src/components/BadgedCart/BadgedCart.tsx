import React, { memo, FC } from "react";
import { ReactComponent as Cart } from "../../assets/icons/cart.svg";
import { useManageGames } from "../../contexts/ManageGamesContext";
import "./styles.css";

const BadgedCart: FC = () => {
  const { selectedGameIds } = useManageGames();
  const itemCount = selectedGameIds.length;
  const counterBadge = (
    <div className="BadgedCart-badge" data-testid="counterBadge">
      {itemCount}
    </div>
  );
  return (
    <div className="BadgedCart-container">
      {!!itemCount && counterBadge}
      <Cart />
    </div>
  );
};

export default memo(BadgedCart);
