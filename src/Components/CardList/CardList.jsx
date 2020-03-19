import React, { Fragment } from 'react';
import './CardList.css';

import LargeCard from '../LargeCard/LargeCard';

export default function CardList({pokemonsOnCatalog, handleClick}) {
  return (
    <div className="CardList-container">
      {pokemonsOnCatalog.map((props) => {
        return (
          <Fragment key={props.id}>
            <LargeCard {...props} handleClick={handleClick} />
          </Fragment>
        );
      })}
    </div>
  );
}
