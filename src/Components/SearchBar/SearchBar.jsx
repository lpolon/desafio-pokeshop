import React, { Fragment } from 'react';
import './SearchBar.css';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar({handleChange, searchInput}) {

  return (
    <Fragment>
      <div className="search-input control has-icons-left has-icons-right">
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
    </Fragment>
  );
}

function RemoveSearchInputButton({ handleChange }) {
  return (
    <div
      className="block animated fadeIn"
      style={{ animationDuration: '0.3s' }}
    >
      <button onClick={() => handleChange('')} className="delete"></button>
    </div>
  );
}
