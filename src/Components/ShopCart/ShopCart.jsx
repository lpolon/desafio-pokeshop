import React from 'react';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './ShopCart.css';

import ShopCartItem from '../ShopCartItem/ShopCartItem';

export default function ShopCart({ pokemonsOnCart, handleClick }) {
  const totalPriceValue = pokemonsOnCart.reduce(
    (acc, { price }) => acc + price,
    0
  );
  return (
    <table className="table is-fullwidth is-hoverable">
      <thead>
        <tr>
          <th className="header" colSpan="4">
            <span className="icon">
              <FA icon={faShoppingCart} style={{ marginRight: '1rem' }} />
            </span>
            Carrinho
          </th>
        </tr>
      </thead>
      <tbody>
        {pokemonsOnCart.map((pokemon) => {
          return (
            <tr className="table-row" key={pokemon.id}>
              <ShopCartItem {...pokemon} handleClick={handleClick} />
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="2" className="total">
            Total:
          </td>
          <td colSpan="2" className="total value">
            <figure className="image-container">
              <img src="/Pokémon_Dollar_sign.svg" alt="pokémon dollar sign" />
            </figure>
            <span>{totalPriceValue}</span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
