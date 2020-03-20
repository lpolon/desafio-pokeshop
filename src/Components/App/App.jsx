import 'animate.css';
import './App.sass';
import './App.css';
import 'bulma-switch';
import React, { useState, useEffect } from 'react';

import { animated, useSpring } from 'react-spring';

import NavBar from '../NavBar/NavBar';
import CatalogContainer from '../CatalogContainer/CatalogContainer';
import ShopCart from '../ShopCart/ShopCart';

const fakePokemonData = [
  {
    id: 1,
    name: 'Fletchinder',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    price: 20,
  },
  {
    id: 2,
    name: 'ekans',
    sprite: '/pokeball.png',
    price: 10,
  },
  {
    id: 3,
    name: 'Snorlax',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    price: 50,
  },
  {
    id: 4,
    name: 'Lugia',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    price: 200,
  },
  {
    id: 5,
    name: 'Mewtwo',
    sprite:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    price: 300,
  },
];

export default function App() {
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
  const [pokemonsOnCatalog, setPokemonsOnCatalog] = useState(fakePokemonData);
  const [pokemonsOnCart, setOnCart] = useState([]);

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

  return (
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
