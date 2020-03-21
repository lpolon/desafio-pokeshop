import 'animate.css';
import './App.sass';
import './App.css';
import 'bulma-switch';
import 'bulma-pageloader';
import React, { useState, useEffect, useContext } from 'react';

import { ThemeContext } from './theme-context-manager';

import { animated, useSpring } from 'react-spring';

import NavBar from '../NavBar/NavBar';
import CatalogContainer from '../CatalogContainer/CatalogContainer';
import ShopCart from '../ShopCart/ShopCart';

import { pokeApi } from '../../Util/pokeApi';
import typesResourceDictionary from '../../Util/typeResourceDictionary';

import {
  togglePokemonIsOnCartFlag,
  updatePokemonOnCatalogArr,
  addToCart,
  removeFromCart,
} from '../../Util/handleCartStateHelpers';

export default function App() {
  const { theme } = useContext(ThemeContext);

  const [toggleCart, setToggleCart] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  // show/hide cart logic
  const handleToggle = () => setToggleCart(!toggleCart);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    document.title = `PokéShop | ${theme.name}`;
  });

  // animate toggle
  const getAnimatedPropsFromWidth = () => {
    if (width > 769)
      return {
        opacity: toggleCart ? '1' : '0',
        height: '100%',
        width: toggleCart ? '100%' : '0%',
      };
    return {
      opacity: toggleCart ? '1' : '0',
      height: toggleCart ? '85%' : '0%',
      width: '85%',
    };
  };
  const props = useSpring(getAnimatedPropsFromWidth());

  // add remove pokemons on chart
  const [pokemonsOnCatalog, setPokemonsOnCatalog] = useState([]);
  const [pokemonsOnCart, setOnCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllPokemonsFromType = async ({ id }) => {
    setIsLoading(true);
    const response = await pokeApi.getAllPokemonsFromType(
      id,
      typesResourceDictionary,
      fetch
    );
    setIsLoading(false);
    setPokemonsOnCatalog(response);
  };

  useEffect(() => {
    fetchAllPokemonsFromType(theme);
  }, [theme]);

  // if pokemon object has key "isOnCart", toggles it. If not, assign it as true.
  const togglePokemonIsOnCartFlag = (pokemon) => {
    const pokemonCopy = { ...pokemon };
    if (pokemonCopy.hasOwnProperty('isOnCart')) {
      const isOnCartValue = pokemonCopy.isOnCart;
      pokemonCopy.isOnCart = !isOnCartValue;
      return pokemonCopy;
    }
    pokemonCopy.isOnCart = true;
    return pokemonCopy;
  };

  const updatePokemonOnCatalogArr = (index, pokemon, pokemonsOnCatalog) => {
    const pokemonsOnCatalogCopy = [...pokemonsOnCatalog];
    pokemonsOnCatalogCopy.splice(index, 1, pokemon);
    setPokemonsOnCatalog(pokemonsOnCatalogCopy);
  };
  const addToCart = (pokemon, pokemonsOnCart) =>
    setOnCart([...pokemonsOnCart, pokemon]);

  const removeFromCart = (pokemonIndexInArray, pokemonsOnCart) => {
    const pokemonsOnCartCopy = [...pokemonsOnCart];
    pokemonsOnCartCopy.splice(pokemonIndexInArray, 1);
    setOnCart(pokemonsOnCartCopy);
  };

  const handleAddToCart = (idFromEvent) => {
    const foundPokemonIndex = pokemonsOnCatalog.findIndex(
      ({ id: pokemonId, ...pokemon }) => {
        if (pokemon.hasOwnProperty('isOnCart') && pokemon.isOnCart)
          return false;
        return pokemonId === idFromEvent;
      }
    );
    if (foundPokemonIndex === -1) return;
    const foundFlaggedPokemon = togglePokemonIsOnCartFlag(
      pokemonsOnCatalog[foundPokemonIndex]
    );
    addToCart(foundFlaggedPokemon, pokemonsOnCart);
    updatePokemonOnCatalogArr(
      foundPokemonIndex,
      foundFlaggedPokemon,
      pokemonsOnCatalog
    );
  };

  const handleRemoveFromCart = (idFromEvent) => {
    const foundPokemonOnCartIndex = pokemonsOnCart.findIndex(
      ({ id: pokemonId }) => pokemonId === idFromEvent
    );
    const foundPokemonOnCatalogIndex = pokemonsOnCatalog.findIndex(
      ({ id: pokemonId }) => pokemonId === idFromEvent
    );
    const foundFlaggedPokemon = togglePokemonIsOnCartFlag(
      pokemonsOnCatalog[foundPokemonOnCatalogIndex]
    );
    removeFromCart(foundPokemonOnCartIndex, pokemonsOnCart);
    updatePokemonOnCatalogArr(
      foundPokemonOnCatalogIndex,
      foundFlaggedPokemon,
      pokemonsOnCatalog
    );
  };

  return isLoading ? (
    <PageLoader />
  ) : (
    <div className="App">
      <NavBar handleClick={handleToggle} />
      <div className="flex-container">
        <div className="left-column">
          <CatalogContainer
            pokemonsOnCatalog={pokemonsOnCatalog}
            handleClick={handleAddToCart}
          />
        </div>
        <animated.div style={props} className="right-column box">
          <ShopCart
            pokemonsOnCart={pokemonsOnCart}
            handleClick={handleRemoveFromCart}
          />
        </animated.div>
      </div>
    </div>
  );
}

function PageLoader() {
  return (
<div className="pageloader is-active is-info"><span className="title">Gotta Catch 'Em All!</span></div>
  );
}
