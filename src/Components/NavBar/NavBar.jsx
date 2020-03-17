import './NavBar.css';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import React, { useState } from 'react';

export default function NavBar() {
  console.log('render navbar!');
  const [toggle, set] = useState(false);

  const handleToggle = () => set(!toggle)
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item">nome loja</a>
        <a
          onClick={handleToggle}
          role="button"
          className={`navbar-burger burger ${toggle ? 'is-active' : ''}`}
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div className={`navbar-menu ${toggle ? 'is-active' : ''}`}>
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
            <a className="button">
              <span className="icon">
                <FA icon={faShoppingCart} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
