import React, { memo } from "react";
import Layout from "../../components/Layout/Layout";
import Tile from "../../components/Tile/Tile";
import { useManageGames } from "../../contexts/ManageGamesContext";
import { Game } from "../../common/types";

const GameListPage = memo(() => {
  const { allGames } = useManageGames();
  const gameList = Object.values(allGames).map((game: Game) => (
    <Tile key={game.id} gameId={game.id} />
  ));

  return (
    <Layout title="Games">
      <div>{gameList}</div>
    </Layout>
  );
});

export default GameListPage;
