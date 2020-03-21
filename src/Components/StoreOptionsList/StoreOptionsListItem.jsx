import React from 'react';

import './StoreOptionsListItem.css'

export default function StoreOptionsListItem({ id, name, handleClick }) {
  return (
    <span
      id={id}
      className="navbar-item"
      style={{ cursor: 'pointer', fontSize: '1.3rem' }}
      onClick={handleClick}
    >
      {name}
    </span>
  );
}
