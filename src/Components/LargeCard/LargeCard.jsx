import React from 'react';
import './LargeCard.css';

export default function LargeCard({ name, photo, price }) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={photo} alt={name} />
      </div>
      <div className="card-content">
        <h2>{name}</h2>
        <div className="card-info-container">
          <img src="/Pokémon_Dollar_sign.svg" alt="pokémon dollar sign" />
          <p>{price}</p>
        </div>
      </div>
      <footer className="card-footer">
        <a className="card-footer-item">adicionar</a>
      </footer>
    </div>
  );
}
