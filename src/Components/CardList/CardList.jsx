import React, { Fragment } from 'react';
import './CardList.css';

import LargeCard from '../LargeCard/LargeCard';

export default function CardList({pokemons}) {
  return (
    <div className="CardList-container">
      {pokemons.map(({ id, ...rest }) => {
        console.log(rest)
        return (
          <Fragment key={id}>
            <LargeCard {...rest} />
          </Fragment>
        );
      })}
    </div>
  );
}
