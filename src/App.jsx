import React, { useState } from 'react';
import classNames from 'classnames';

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

const ALPHABET = 'alphabet';
const LENGTH = 'length';

const getSortedGoods = (goods, sortBy, isReversed) => {
  const sortedGoods = [...goods];

  if (sortBy === ALPHABET) {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === LENGTH) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const handleSortAlphabetically = () => {
    setSortBy(ALPHABET);
  };

  const handleSortByLength = () => {
    setSortBy(LENGTH);
  };

  const handleReverse = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  const handleReset = () => {
    setSortBy('');
    setIsReversed(false);
  };

  const goods = getSortedGoods(goodsFromServer, sortBy, isReversed);

  const isInitialOrder = !sortBy && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== ALPHABET,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== LENGTH,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
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
