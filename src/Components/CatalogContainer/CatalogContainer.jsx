import React, { Fragment, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Catalog from '../Catalog/Catalog';

export default function CatalogContainer({ pokemonsOnCatalog, handleClick, toggleCartValue }) {
  const [searchInput, setSearchInput] = useState('');

  const handleChange = (value) => {
    setSearchInput(value);
  };

  const groupByChar = (string) => {
    return string.split('').reduce((acc, char) => {
      if (!acc.hasOwnProperty(char)) {
        acc[char] = 1;
        return acc;
      }
      acc[char] += 1;
      return acc;
    }, {});
  };


  const filterCatalog = (pokemons, searchInput) => {
    if (searchInput === '') return pokemons;
    return pokemons.filter(({ name }) => {
      const nameObj = groupByChar(name.toLowerCase());
      const searchInputObj = groupByChar(searchInput.toLowerCase());
  
      const searchObjKeyArr = Object.keys(searchInputObj);
  
      // procure por uma key no searchInputObj que o nameObj NÃO contem
      const check1 = searchObjKeyArr.find((key) => !nameObj.hasOwnProperty(key));
      const nameDoesNotIncludesKey = typeof check1 !== 'undefined';
      if (nameDoesNotIncludesKey) return;
  
      // procure por um valor no searchInputObj que seja maior do que no nameObj
      const check2 = searchObjKeyArr.find(
        (key) => (searchInputObj[key] > nameObj[key])
      );
      const doesSearchHasBiggerValueThanName = typeof check2 !== 'undefined';
      if (doesSearchHasBiggerValueThanName) return;
      return true;
    });
  };

  const pokemons = filterCatalog(pokemonsOnCatalog, searchInput);

  return (
    <Fragment>
      <SearchBar searchInput={searchInput} handleChange={handleChange} toggleCartValue={toggleCartValue}
      />
      <Catalog pokemonsArr={pokemons} handleClick={handleClick} />
    </Fragment>
  );
}
