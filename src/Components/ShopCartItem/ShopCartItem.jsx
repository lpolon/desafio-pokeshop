import React, { Fragment } from 'react';

export default function ShopCartItem({
  id,
  handleClick,
  sprites: {front_default: sprite},
  base_experience: price,
  name,
}) {
  return (
    <Fragment>
      <td className="is-narrow">
        <button
          onClick={() => handleClick(id)}
          className="delete is-medium"
        ></button>
      </td>
      <td>
        <figure className="image is-64x64">
          <img src={sprite === null ? '/pokeball.png': sprite} alt="" />
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
