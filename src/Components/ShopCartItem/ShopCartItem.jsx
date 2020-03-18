import React, { Fragment } from 'react';

export default function ShopCartItem({ sprite, name, price }) {
  return (
    <Fragment>
      <td className="is-narrow">
        <button className="delete is-medium"></button>
      </td>
      <td>
        <figure className="image is-64x64">
          <img src={sprite} alt="" />
        </figure>
      </td>
      <td>{name}</td>
      <td className="price">
        <figure className="image-container">
          <img src="/Pokémon_Dollar_sign.svg" alt="pokémon dollar sign" />
        </figure>
        <span>{price}</span>
      </td>
    </Fragment>
  );
}
