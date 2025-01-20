/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';

import './App.scss';

const initialGoods = [
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
  const [goods, setGoods] = useState(initialGoods);
  const [isReversed, setIsReversed] = useState(false);
  const [sortOrder, setSortOrder] = useState(''); // "alphabetical", "length", "reset"

  const sortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    setGoods(sortedGoods);
    setSortOrder('alphabetical');
    setIsReversed(false);
  };

  const sortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

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
    setGoods(initialGoods);
    setSortOrder('reset');
    setIsReversed(false);
  };

  return (
    <div className="section container">
      <h1 className="title">Goods Reorder</h1>

      <div className="buttons">
        <button
          className={`button ${sortOrder === 'alphabetical' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          className={`button ${sortOrder === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          className={`button ${isReversed ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {sortOrder !== 'reset' && (
          <button className="button" onClick={resetOrder}>
            Reset
          </button>
        )}
      </div>

      <ul className="list">
        {goods.map(good => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
