import './NavBar.css';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import React, { useState } from 'react';

export default function NavBar({ handleClick }) {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">nome loja</a>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">Lojas</a>
            <div className="navbar-dropdown">
              <a className="navbar-item">Loja 1</a>
              <a className="navbar-item">Loja 2</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <input
              onClick={handleClick}
              className="button"
              id="switchNormal"
              type="checkbox"
              name="switchNormal"
              className="switch"
            />
            <label htmlFor="switchNormal">
              <FA icon={faShoppingCart} />
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}
