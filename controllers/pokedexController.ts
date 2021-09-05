import express, { Request, Response, NextFunction } from 'express';
import PokedexService from '../services/PokedexService';
import { IPage, IId, IPageType } from '../Type';

class PokedexController {
  public router: express.Router;
  private service: PokedexService;

  constructor(PokedexService: PokedexService) {
    this.router = express.Router();
    this.service = PokedexService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getPageOfPokemons);
    this.router.get('/:id', this.getPokemonById);
    this.router.get('/types/all', this.getAllTypes);
    this.router.post('/', this.getPageOfChosenType);
  };

  private getPageOfPokemons = async (
    req: Request<{}, {}, {}, IPage>,
    res: Response,
    next: NextFunction
  ) => {
    const { query: { page } } = req;
    if (!page) {
      return next({ status: 404, message: 'No page found' });
    }
    const result = await this.service.getPageOfPokemons(page);
    return res.status(200).json(result);
  }

  private getPokemonById = async (
    req: Request<IId, {}, {}, {}>,
    res: Response,
    next: NextFunction,
  ) => {
    const { params: { id } } = req;
    const result = await this.service.getPokemonById(id);
    if (result.error) {
      return next(result.error);
    }
    return res.status(200).json(result);
  }

  private getAllTypes = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const result = await this.service.getAllTypes();
    return res.status(200).json(result);
  }

  private getPageOfChosenType = async (
    req: Request<{}, {}, IPageType, {}>,
    res: Response,
    _next: NextFunction
  ) => {
    const { body: { page, type } } = req;
    const result = await this.service.getPageOfChosenType(page, type);
    return res.status(200).json(result);
  }

}

export default PokedexController;
