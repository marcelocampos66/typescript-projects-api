import PokedexModel from "../models/PokedexModel";

class PokedexService {
  private model: PokedexModel;

  constructor(PokedexModel: PokedexModel) {
    this.model = PokedexModel;
  }

  public async getPageOfPokemons(page: string) {
    const numberPage = parseInt(page, 10);
    const result = await this.model.getPageOfPokemons(numberPage);
    return result;
  }

  public async getPokemonById(id: string) {
    const result = await this.model.getPokemonById(id);
    if (!result) {
      return ({
        error: {
          status: 404,
          message: 'Pokemon not found!',
        },
      });
    }
    return result;
  }

  public async getAllTypes() {
    const allTypes = await this.model.getAllTypes();
    const result: Array<string> = allTypes.sort((a:string, b:string) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    })
    return result;
  }

  public async getPageOfChosenType(page: number, type: string) {
    const result = await this.model.getPageOfChosenType(page, type);
    return result;
  }

}

export default PokedexService;
