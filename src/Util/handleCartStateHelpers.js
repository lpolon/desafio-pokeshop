// if pokemon object has key "isOnCart", toggles it. If not, assign it as true.
export const togglePokemonIsOnCartFlag = (pokemon) => {
  const pokemonCopy = { ...pokemon };
  if (pokemonCopy.hasOwnProperty('isOnCart')) {
    const isOnCartValue = pokemonCopy.isOnCart;
    pokemonCopy.isOnCart = !isOnCartValue;
    return pokemonCopy;
  }
  pokemonCopy.isOnCart = true;
  return pokemonCopy;
};

export const updatePokemonOnCatalogArr = (
  index,
  pokemon,
  pokemonsOnCatalog,
  setFn
) => {
  const pokemonsOnCatalogCopy = [...pokemonsOnCatalog];
  pokemonsOnCatalogCopy.splice(index, 1, pokemon);
  setFn(pokemonsOnCatalogCopy);
};
export const addToCart = (pokemon, pokemonsOnCart, setFn) =>
  setFn([...pokemonsOnCart, pokemon]);

export const removeFromCart = (pokemonIndexInArray, pokemonsOnCart, setFn) => {
  const pokemonsOnCartCopy = [...pokemonsOnCart];
  pokemonsOnCartCopy.splice(pokemonIndexInArray, 1);
  setFn(pokemonsOnCartCopy);
};
