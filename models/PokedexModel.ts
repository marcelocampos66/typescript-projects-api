import Connection from './Connection';

class PokedexModel extends Connection {
  constructor(){
    super();
  }

  public async getPageOfPokemons(page: number) {
    const toSkip = page === 1 ? 0 : (page - 1) * 12;
    const result = await this.connection()
      .then((db) => db.collection('pokemons')
      .find().limit(12).skip(toSkip).toArray());
    const quantity = await this.connection()
      .then((db) => db.collection('pokemons').countDocuments());
    return { quantity, result };
  }

  public async getPokemonById(id: string) {
    return this.connection()
      .then((db) => db.collection('pokemons').findOne({ _id: id }))
  }
  
  public async getAllTypes() {
    const result = await this.connection()
      .then((db) => db.collection('pokemons').find(
        {},
        { projection: { _id: 0, type: 1 } },
      ).toArray());
    const all = result.reduce((acc: Array<string>, { type }) => {
      return [...acc, ...type];
    }, []);
    const allTypes = all.reduce((acc: string[], type: string) => {
      if (acc.includes(type)) {
        return acc;
      }
      return [...acc, type];
    }, []);
    return allTypes;
  }

  public async getPageOfChosenType(page: number, type: string) {
    const toSkip = page === 1 ? 0 : (page - 1) * 12;
    const result = await this.connection()
      .then((db) => db.collection('pokemons')
      .find({ type }).limit(12).skip(toSkip).toArray());
    const quantity = await this.connection()
      .then((db) => db.collection('pokemons').countDocuments({ type }));
    return { quantity, result };
  }

}

export default PokedexModel;
