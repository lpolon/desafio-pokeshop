import React, { useContext } from 'react';
import './CatalogCard.css';

import { ThemeContext } from '../App/theme-context-manager';

export default function CatalogCard({
  id,
  handleClick,
  name,
  sprites: {front_default: sprite},
  base_experience: price,
  isOnCart = false,
}) {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`card ${isOnCart ? 'is-shadowless' : ''}`}
      style={{
        backgroundColor: theme.background,
        opacity: isOnCart ? '.5' : '1',
      }}
    >
      <div className="card-image">
        <img src={sprite === null ? '/pokeball.png': sprite} alt={name} />
      </div>
      <div className="card-content">
        <h2>{name}</h2>
        <div className="card-info-container">
          <img src="/Pokémon_Dollar_sign.svg" alt="pokémon dollar sign" />
          <p>{price}</p>
        </div>
      </div>
      <footer className="card-footer">
        <span className="card-footer-item is-paddingless">
          {isOnCart ? (
            <button
              onClick={() => handleClick(id)}
              className="button is-light has-background-white is-fullwidth"
              disabled
            >
              adicionado
            </button>
          ) : (
            <button
              onClick={() => handleClick(id)}
              className="button is-link is-light has-background-white is-fullwidth"
              style={{ color: theme.color, opacity: '.8' }}
            >
              adicionar
            </button>
          )}
        </span>
      </footer>
    </div>
  );
}
