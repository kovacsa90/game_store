export type Game = {
  id: string;
  artworkUrl: string;
  name: string;
  rating: number;
  tags: string[];
  releaseDate: string;
  price: number;
  quantity: number;
};

export type GamesMap = {
  [key: string]: Game;
};

export type GamesObject = {
  games: Game[];
};

export type CurrencyRates = {
  [key: string]: number;
};
