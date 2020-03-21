import './NavBar.css';

import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import React, { useContext } from 'react';

import { ThemeContext } from '../App/theme-context-manager';

export default function NavBar({ handleClick }) {
  const {theme, handleThemeChange} = useContext(ThemeContext);
  const getThemeString = ({target: {id}}) => {
    handleThemeChange(id)
  }

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand" style={{minWidth: '140px'}}>
        <span
          className="navbar-item"
          style={{fontSize: '1.4rem', color: theme.color}}
          >
            {theme.name}
            </span>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item has-dropdown is-hoverable">
            <span className="navbar-link">Lojas</span>
            <div className="navbar-dropdown">
              <span
              id="ice"
              className="navbar-item"
              style={{cursor: 'pointer', fontSize: '1.3rem'}}
              onClick={getThemeString}
              >Gelo</span>
              <span
              id="ghost"
              className="navbar-item"
              style={{cursor: 'pointer', fontSize: '1.3rem'}}
              onClick={getThemeString}
              >Fantasma</span>
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
