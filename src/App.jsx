import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const ORDER = {
  ORIGINAL: 'original',
  ALPHABET: 'alphabet',
  LENGTH: 'length',
};

export const App = () => {
  const [order, setOrder] = useState(ORDER.ORIGINAL);
  const [isReversed, setIsReversed] = useState(false);
  const getGoods = () => {
    const goods = [...goodsFromServer];

    if (order === ORDER.ALPHABET) {
      goods.sort((a, b) => a.localeCompare(b));
    } else if (order === ORDER.LENGTH) {
      goods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  };

  const goods = getGoods();
  const isOriginalOrder = order === ORDER.ORIGINAL && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${order === ORDER.ALPHABET ? '' : ' is-light'}`}
          onClick={() => {
            if (order === ORDER.ALPHABET) {
              setOrder(ORDER.ORIGINAL);
            } else {
              setOrder(ORDER.ALPHABET);
            }
          }}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success${order === ORDER.LENGTH ? '' : ' is-light'}`}
          onClick={() => {
            if (order === ORDER.LENGTH) {
              setOrder(ORDER.ORIGINAL);
            } else {
              setOrder(ORDER.LENGTH);
            }
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${isReversed && !isOriginalOrder ? '' : ' is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setOrder(ORDER.ORIGINAL);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
