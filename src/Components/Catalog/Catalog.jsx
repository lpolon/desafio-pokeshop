import React, { Fragment } from 'react';
import './Catalog.css';

import CatalogCard from '../CatalogCard/CatalogCard';

export default function Catalog({pokemonsOnCatalog, handleClick}) {
  return (
    <div className="Catalog-container">
      {pokemonsOnCatalog.map((props) => {
        return (
          <Fragment key={props.id}>
            <CatalogCard {...props} handleClick={handleClick} />
          </Fragment>
        );
      })}
    </div>
  );
}
