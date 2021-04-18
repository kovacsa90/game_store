import React, { FC, memo } from "react";
import DetailsCell from "../Cells/DetailsCell/DetailsCell";
import RatingCell from "../Cells/RatingCell/RatingCell";
import TagsCell from "../Cells/TagsCell/TagsCell";
import QuantityCell from "../Cells/QuantityCell/QuantityCell";
import PriceCell from "../Cells/PriceCell/PriceCell";
import ButtonCell from "../Cells/ButtonCell/ButtonCell";
import { useManageGames } from "contexts/ManageGamesContext";
import "./styles.css";

interface TileProps {
  gameId: string;
  isCheckoutPage?: boolean;
}
const Tile: FC<TileProps> = ({ gameId, isCheckoutPage = false }: TileProps) => {
  const {
    allGames,
    setAllGames,
    selectedGameIds,
    setSelectedGameIds,
  } = useManageGames();
  const gameObject = allGames[gameId];
  const {
    artworkUrl,
    releaseDate,
    name,
    rating,
    tags,
    price,
    quantity,
  } = gameObject;
  const priceTimesQuantity = price * quantity;

  const handleQuantityChange = (type: string) => {
    if (type === "add") {
      const updatedGame = { ...gameObject, quantity: quantity + 1 };
      setAllGames({ ...allGames, [gameId]: { ...updatedGame } });
    } else {
      const updatedGame = { ...gameObject, quantity: quantity - 1 || 1 };
      setAllGames({ ...allGames, [gameId]: { ...updatedGame } });
    }
  };

  const isTileSelected = selectedGameIds.includes(gameId);

  const handleGameSelection = () => {
    if (isTileSelected) {
      const updatedGameIds = selectedGameIds.filter((item) => item !== gameId);
      // Set quantity to 1 when the game is removed on the checkout page
      if (isCheckoutPage) {
        const updatedGame = { ...gameObject, quantity: 1 };
        setAllGames({ ...allGames, [gameId]: { ...updatedGame } });
      }
      setSelectedGameIds(updatedGameIds);
    } else {
      setSelectedGameIds([...selectedGameIds, gameId]);
    }
  };

  const classNames = ["Tile-container"];
  isCheckoutPage && classNames.push("Tile-container-checkout");

  return (
    <div className={classNames.join(" ")}>
      <DetailsCell
        artworkUrl={artworkUrl}
        releaseDate={releaseDate}
        name={name}
      />
      {!isCheckoutPage && <RatingCell rating={rating} />}
      {!isCheckoutPage && <TagsCell tags={tags} />}
      <QuantityCell quantity={quantity} handleChange={handleQuantityChange} />
      <PriceCell price={priceTimesQuantity} />
      <ButtonCell
        isSelected={!!isTileSelected}
        isCheckout={isCheckoutPage}
        onClick={handleGameSelection}
      />
    </div>
  );
};

export default memo(Tile);
