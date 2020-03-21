import React, { Fragment } from 'react';
import './Catalog.css';

import CatalogCard from '../CatalogCard/CatalogCard';

export default function Catalog({pokemonsArr = [], handleClick}) {
  return (
    <div className="Catalog-container">
      {pokemonsArr.map((props) => {
        return (
          <Fragment key={props.id}>
            <CatalogCard {...props} handleClick={handleClick} />
          </Fragment>
        );
      })}
    </div>
  );
}
