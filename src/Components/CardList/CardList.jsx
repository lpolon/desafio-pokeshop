import React, { Fragment } from 'react';
import './CardList.css';

import LargeCard from '../LargeCard/LargeCard';

const fakeCardDataProps = [
  {
    id: 1,
    name: 'Fletchinder',
    photo: '/pokeball.png',
    price: 20,
  },
  {
    id: 2,
    name: 'ekans',
    photo: '/pokeball.png',
    price: 10,
  },
  {
    id: 3,
    name: 'Snorlax',
    photo: '/pokeball.png',
    price: 50,
  },
  {
    id: 4,
    name: 'Lugia',
    photo: '/pokeball.png',
    price: 200,
  },
  {
    id: 5,
    name: 'Mewtwo',
    photo: '/pokeball.png',
    price: 300,
  },
];

export default function CardList(props) {
  return (
    <div className="CardList-container">
      {fakeCardDataProps.map(({ id, ...rest }) => {
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
