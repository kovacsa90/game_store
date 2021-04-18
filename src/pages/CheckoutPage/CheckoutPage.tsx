import React, { memo } from "react";
import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";
import Tile from "../../components/Tile/Tile";
import { useManageGames } from "../../contexts/ManageGamesContext";
import { useHistory } from "react-router-dom";
import { useCurrency } from "../../contexts/CurrencyContext";
import { getAdjustedPrice } from "../../components/Cells/utils";
import "./styles.css";

const CheckoutPage = memo(() => {
  const { allGames, selectedGameIds } = useManageGames();
  const history = useHistory();
  const { currency, rate } = useCurrency();

  const priceSum = selectedGameIds.reduce(
    (sum, id) => sum + allGames[id].price * allGames[id].quantity,
    0
  );

  const itemSum = selectedGameIds.reduce(
    (sum, id) => sum + allGames[id].quantity,
    0
  );

  const adjustedPriceSum = getAdjustedPrice(priceSum, rate, currency);
  const orderValue = (
    <div className="CheckoutPage-OrderDetails-container CheckoutPage-OrderValue">
      <div>Order Value</div> <div>{adjustedPriceSum}</div>
    </div>
  );

  const totalItems = (
    <div className="CheckoutPage-OrderDetails-container">
      <div>Total items</div> <div>{itemSum}</div>
    </div>
  );

  const selectedGameList = selectedGameIds.map((id) => (
    <Tile key={id} gameId={id} isCheckoutPage />
  ));

  return (
    <Layout
      title="Checkout"
      backButton={{
        text: "Go back to overview page",
        onClick: () => history.push("/list"),
      }}
    >
      <div className="CheckoutPage-container">
        <div className="CheckoutPage-GameList-container">
          {selectedGameList}
          {!itemSum && "Checkout cart is empty!"}
        </div>

        <div className="CheckoutPage-Overview-container">
          {orderValue}
          {totalItems}
          <hr className="CheckoutPage-Divider" />
          <Button
            variant="link"
            color="secondary"
            fullWidth
            onClick={() => history.push("/")}
          >
            Back to overview
          </Button>
        </div>
      </div>
    </Layout>
  );
});

export default CheckoutPage;
