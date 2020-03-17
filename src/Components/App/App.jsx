import 'bulma/css/bulma.css';
import 'animate.css';
import './App.css';

import React from 'react';

import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import CardList from '../CardList/CardList';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <SearchBar />
      <CardList />
    </div>
  );
}
