import PokedexController from '../controllers/pokedexController';
import PokedexModel from '../models/PokedexModel';

interface IPage {
  page: string;
}

interface IId {
  id: string;
}

interface IPageType {
  page: number;
  type: string;
}

interface IControllers {
  pokedex: PokedexController;
}

interface IModels {
  Pokedex: PokedexModel;
}
