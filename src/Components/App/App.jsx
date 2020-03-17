import 'animate.css';
import './App.sass';
import './App.css';

import React from 'react';

import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import CardList from '../CardList/CardList';

import ShopCard from '../ShopCart/ShopCart';

export default function App() {
  return (
    <div className="App">
          <NavBar />
      <div className="flex-container">
        <div className="left-column">
          <SearchBar />
          <CardList />
        </div>
        <div className="right-column">
          <ShopCard />
        </div>
      </div>
    </div>
  );
}
