import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const originalGoods = [
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

const getSortedGoods = (goods, sortType, isReversed) => {
  const sortedGoods = [...goods];

  if (sortType === 'alphabet') {
    sortedGoods.sort();
  } else if (sortType === 'length') {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState('');

  const goods = getSortedGoods(originalGoods, sortType, isReversed);

  const sortByAlphabet = () => {
    setSortType('alphabet');
  };

  const sortByLength = () => {
    setSortType('length');
  };

  const reverseGoods = () => {
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setSortType('');
    setIsReversed(false);
  };

  const isChanged = sortType !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
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

        {isChanged && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
