import 'bulma/css/bulma.css';
import 'animate.css';
import './App.css';

import React from 'react';

import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';

export default function App() {
  return (
    <div className="App">
      <NavBar />
      <SearchBar />
    </div>
  );
}
