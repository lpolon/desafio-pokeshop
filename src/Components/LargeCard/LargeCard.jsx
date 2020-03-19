import React from 'react';
import './LargeCard.css';

export default function LargeCard({ id, handleClick, name, sprite, price }) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={sprite} alt={name} />
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
          <button onClick={() => handleClick(id)} className="button is-link is-light has-background-white is-fullwidth">
            adicionar
          </button>
        </span>
      </footer>
    </div>
  );
}
