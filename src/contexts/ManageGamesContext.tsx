import React, { createContext, useContext } from "react";
import { GamesMap } from "../common/types";

interface ManageGames {
  allGames: GamesMap;
  setAllGames: (value: GamesMap) => void;
  selectedGameIds: string[];
  setSelectedGameIds: (value: string[]) => void;
}

type ManageGamesProps = {
  context: ManageGames;
  children: React.ReactNode;
};

const ManageGamesContext = createContext({} as ManageGames);

const ManageGamesProvider: React.FC<ManageGamesProps> = ({
  context,
  children,
}: ManageGamesProps) => {
  return (
    <ManageGamesContext.Provider value={context}>
      {children}
    </ManageGamesContext.Provider>
  );
};

const useManageGames = (): ManageGames => {
  const {
    allGames,
    setAllGames,
    selectedGameIds,
    setSelectedGameIds,
  } = useContext(ManageGamesContext);
  if (
    allGames === undefined ||
    setAllGames === undefined ||
    selectedGameIds === undefined ||
    setSelectedGameIds === undefined
  ) {
    throw new Error("useManageGames must be used within a ManageGamesProvider");
  }
  return { allGames, setAllGames, selectedGameIds, setSelectedGameIds };
};

export { ManageGamesProvider, useManageGames };
