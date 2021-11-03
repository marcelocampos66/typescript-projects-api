import PokedexController from "./pokedexController";
import PokedexService from '../services/PokedexService';

export default {
  pokedex: new PokedexController(PokedexService),
};
