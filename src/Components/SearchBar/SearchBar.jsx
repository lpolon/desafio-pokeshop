import React from 'react';
import './SearchBar.css';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({
  handleChange,
  searchInput,
  toggleCartValue,
}) {
  return (
    <div
      className={`search-input control has-icons-left has-icons-right ${
        toggleCartValue ? 'search-input-open-cart' : 'search-input-close-cart'
      }`}
    >
      <input
        type="text"
        name="search"
        placeholder="Nome do Pokémon"
        className="input is-info"
        value={searchInput}
        onChange={({ target: { value } }) => handleChange(value)}
      />
      <span className="icon is-small is-left">
        <FA icon={faSearch} />
      </span>
      <span className="icon is-small is-right">
        {!searchInput ? null : (
          <RemoveSearchInputButton handleChange={handleChange} />
        )}
      </span>
    </div>
  );
}

function RemoveSearchInputButton({ handleChange }) {
  return (
    <div className="block remove-button">
      <button onClick={() => handleChange('')} className="delete"></button>
    </div>
  );
}
