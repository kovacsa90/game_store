import React, { useState, useEffect, memo, FC } from "react";
import GameListPage from "./pages/GameListPage/GameListPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { ManageGamesProvider } from "./contexts/ManageGamesContext";
import { GamesMap, GamesObject, CurrencyRates } from "./common/types";
import useFetchData from "./api/fetchData";
import "fontsource-roboto";
import "./mock/server";
import "./index.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const GamesApp: FC = () => {
  const DEFAULT_CURRENCY = "USD";
  const [allGames, setAllGames] = useState<GamesMap>({});
  const [selectedGameIds, setSelectedGameIds] = useState<string[]>([]);
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP">(
    DEFAULT_CURRENCY
  );
  const currencyRates: CurrencyRates = useFetchData(`/api/rates`);
  const gamesData: GamesObject = useFetchData("/api/games");

  useEffect(() => {
    if (gamesData?.games) {
      const gamesMap: GamesMap = {};
      gamesData.games.forEach(
        (gameObject) =>
          (gamesMap[gameObject.id] = { ...gameObject, quantity: 1 })
      );
      setAllGames(gamesMap);
    }
  }, [gamesData]);

  let rate = 1;
  if (currencyRates) {
    rate = currencyRates[currency.toUpperCase()];
  }

  return (
    <React.StrictMode>
      <ManageGamesProvider
        context={{ allGames, setAllGames, selectedGameIds, setSelectedGameIds }}
      >
        <CurrencyProvider context={{ currency, setCurrency, rate }}>
          <Router>
            <Switch>
              <Route path="/list">
                <GameListPage />
              </Route>

              <Route path="/checkout">
                <CheckoutPage />
              </Route>

              <Redirect from="*" to="/list" />
            </Switch>
          </Router>
        </CurrencyProvider>
      </ManageGamesProvider>
    </React.StrictMode>
  );
};

export default memo(GamesApp);
