import PokedexController from "./pokedexController";
import ProjectsController from './projectsController';
import PokedexService from '../services/PokedexService';
import ProjectsService from '../services/ProjectsService';

export default {
  pokedex: new PokedexController(PokedexService),
  projects: new ProjectsController(ProjectsService),
};
