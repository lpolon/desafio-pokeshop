export const pokeApi = {
  baseUrl: 'https://pokeapi.co/api/v2',
  get typeBaseUrl() {
    return `${this.baseUrl}/type`;
  },

  async getAllPokemonsFromType(typeName, typeDic, fetch) {
    const endpoint = `${this.typeBaseUrl}/${typeDic[typeName]}`;
    try {
      const response = await fetch(endpoint);
      const json = await response.json();
      const { pokemon: pokemonArr } = json;
      const pokemonsResourceEndPoints = [];
      pokemonArr.forEach(({ pokemon: { url } }) => {
        pokemonsResourceEndPoints.push(url);
      });
      const jsonArr = await Promise.all(
        pokemonsResourceEndPoints.map(async (endpoint) => {
          const response = await fetch(endpoint);
          return response.json();
        })
      );
      return jsonArr;
    } catch (error) {
      console.log(error);
    }
  },
};
