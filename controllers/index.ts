import services from '../services';
import PokedexController from "./pokedexController";

export default {
  pokedex: new PokedexController(services.PokedexService),
};
