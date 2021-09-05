import models from '../models';
import PokedexService from './PokedexService';

export default {
  PokedexService: new PokedexService(models.PokedexModel),
};
