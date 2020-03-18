import 'animate.css';
import './App.sass';
import './App.css';

import React from 'react';

import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import CardList from '../CardList/CardList';

import ShopCart from '../ShopCart/ShopCart';

const pokemons = [
  {
    id: 1,
    name: 'Fletchinder',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
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
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    price: 50,
  },
  {
    id: 4,
    name: 'Lugia',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    price: 200,
  },
  {
    id: 5,
    name: 'Mewtwo',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    price: 300,
  },
];


export default function App() {
  return (
    <div className="App">
          <NavBar />
      <div className="flex-container">
        <div className="left-column">
          <SearchBar />
          <CardList pokemons={pokemons}/>
        </div>
        <div className="right-column box">
          <ShopCart pokemons={pokemons}/>
        </div>
      </div>
    </div>
  );
}
