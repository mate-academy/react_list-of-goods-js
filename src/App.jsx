/* eslint-disable max-len */
/* eslint-disable prettier/prettier */


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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortOrder, setSortOrder] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    const sortedGoods = [...goodsFromServer].sort();

    setGoods(sortedGoods);
    setSortOrder('alphabetical');
    setIsReversed(false);
  };

  const sortByLength = () => {
    const sortedGoods = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setGoods(sortedGoods);
    setSortOrder('length');
    setIsReversed(false);
  };

  const reverseOrder = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const resetOrder = () => {
    setGoods(goodsFromServer);
    setSortOrder('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === 'alphabetical' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {sortOrder || isReversed ? (
          <button
            type="button"
            className="button is-danger"
            onClick={resetOrder}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

