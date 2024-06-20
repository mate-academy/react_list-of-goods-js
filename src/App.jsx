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
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(null);

  const reverseGoods = () => {
    setReversed(!isReversed);
  };

  const resetGoods = () => {
    setSortType(null);
    setReversed(false);
  };

  const isResetVisible = sortType || isReversed;
  const newGoods = [...goodsFromServer];

  if (sortType === 'alphabetically') {
    newGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === 'length') {
    newGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    newGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetically' ? 'is-light' : ''}`}
          onClick={() => {
            setSortType('alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? 'is-light' : ''}`}
          onClick={() => {
            setSortType('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {newGoods.map((good, index) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
