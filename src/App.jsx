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
  const [sortBy, setSortBy] = useState('');

  const [isReversed, setIsReversed] = useState(false);

  const applyAlphabetSort = () => {
    setSortBy('alphabet');
  };

  const applyLengthSort = () => {
    setSortBy('length');
  };

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const resetSort = () => {
    setSortBy('');
    setIsReversed(false);
  };

  const getSortedGoods = () => {
    const sorted = [...goodsFromServer];

    if (sortBy === 'alphabet') {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (sortBy === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const visibleGoods = getSortedGoods();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortBy === 'alphabet' ? 'button is-info' : 'button is-info is-light'
          }
          onClick={applyAlphabetSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortBy === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={applyLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
