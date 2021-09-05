import PokedexController from './controllers/pokedexController';

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
