import Pokedex from "pokedex-promise-v2"

const options: any = {
  protocol: "https",
  hostName: "pokeapi.co",
  versionPath: "/api/v2/",
  cacheLimit: 100 * 1000, // 100s
}
const P = new Pokedex(options)

export default P
