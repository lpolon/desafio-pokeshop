import React, { Fragment } from 'react';
import storeThemes from '../App/storeThemes';

import StoreOptionsListItem from './StoreOptionsListItem';

export default function StoreOptionList({ handleClick }) {
  return Object.keys(storeThemes).map((key) => {
    if (key === 'getTheme') return;
    const { id, name } = storeThemes[key];
    return (
      <Fragment key={id}>
        <StoreOptionsListItem handleClick={handleClick} id={id} name={name} />
      </Fragment>
    );
  });
}
