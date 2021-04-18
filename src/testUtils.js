import { createServer } from "miragejs";

const shortData = [
  {
    id: "1152350815",
    artworkUrl:
      "https://is5-ssl.mzstatic.com/image/thumb/Purple124/v4/f8/b5/fe/f8b5fead-500d-59ed-25e0-dca91d6aba1c/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-6.png/200x200bb.png",
    name: "FINALFANTASY XV POCKET EDITION",
    rating: 4,
    tags: ["Games", "Action", "Role Playing"],
    releaseDate: "2018-02-08",
    price: 2.1,
  },
  {
    id: "1287138671",
    artworkUrl:
      "https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/7b/b0/2e/7bb02eeb-74c7-e6c1-994a-ed9929d74469/AppIcon-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/200x200bb.png",
    name: "Thumper: Pocket Edition",
    rating: 5,
    tags: ["Games", "Music", "Action"],
    releaseDate: "2018-01-24",
    price: 4.7,
  },
];

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    routes() {
      this.namespace = "api";

      this.get("/games", { games: shortData });
      this.get("/rates", {
        USD: 1,
        EUR: 0.8738967054,
        GBP: 0.7869876781,
      });
    },
  });

  return server;
}
