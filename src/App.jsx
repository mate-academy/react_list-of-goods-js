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
  const [sortType, setSortType] = useState('original'); // 'original', 'alpha', 'length'
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = () => {
    const sorted = [...goodsFromServer];

    if (sortType === 'alpha') {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const handleSortAlphabetically = () => {
    setSortType('alpha');
  };

  const handleSortByLength = () => {
    setSortType('length');
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType('original');
    setIsReversed(false);
  };

  const goods = getSortedGoods();

  const isInitialOrder =
    sortType === 'original' &&
    !isReversed &&
    goods.every((good, index) => good === goodsFromServer[index]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alpha' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === 'length' ? '' : 'is-light'
          }`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
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
