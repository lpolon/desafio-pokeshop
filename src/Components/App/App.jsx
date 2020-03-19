import 'animate.css';
import './App.sass';
import './App.css';
import 'bulma-switch';
import React, { useState, useEffect } from 'react';

import { animated, useSpring } from 'react-spring';

import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import CardList from '../CardList/CardList';
import ShopCart from '../ShopCart/ShopCart';

const pokemons = [
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

  const handleClick = () => setToggleCart(!toggleCart);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

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
  return (
    <div className="App">
      <NavBar handleClick={handleClick} />
      <div className="flex-container">
        <div className="left-column">
          <SearchBar />
          <CardList pokemons={pokemons} />
        </div>
        <animated.div style={props} className="right-column box">
          <ShopCart pokemons={pokemons} />
        </animated.div>
      </div>
    </div>
  );
}
