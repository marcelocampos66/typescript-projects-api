import PokedexController from '../controllers/pokedexController';
import ProjectsController from '../controllers/projectsController';
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
  projects: ProjectsController;
}

interface IModels {
  Pokedex: PokedexModel;
}

interface IProject {
  name: string;
  language: string;
  framework: string;
  description: string;
  image: string;
  link: string;
  isFinished: boolean;
  isDeployed: boolean;
  tags: Array<string>;
}
