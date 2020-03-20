import './NavBar.css';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import React from 'react';

export default function NavBar({ handleClick }) {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <span className="navbar-item">nome loja</span>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <span className="navbar-link">Lojas</span>
            <div className="navbar-dropdown">
              <span className="navbar-item">Loja 1</span>
              <span className="navbar-item">Loja 2</span>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <input
              onClick={handleClick}
              className="button switch"
              id="switchNormal"
              type="checkbox"
              name="switchNormal"
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
