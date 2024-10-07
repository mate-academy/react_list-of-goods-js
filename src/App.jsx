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
  const [isReversed, setIsReversed] = useState(false);
  const [sortMethod, setSortMethod] = useState(null);

  const sortGoods = (method, reverse) => {
    const sortedGoods = [...goodsFromServer];

    if (method === 'alphabetically') {
      sortedGoods.sort();
    } else if (method === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (reverse) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortMethod(method);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
    sortGoods(sortMethod, !isReversed);
  };

  const handleSortAlphabetically = () => {
    sortGoods('alphabetically', isReversed);
  };

  const handleSortByLength = () => {
    sortGoods('length', isReversed);
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setIsReversed(false);
    setSortMethod(null);
  };

  const isActive = method => method === sortMethod;
  const isResetVisible = sortMethod !== null || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isActive('alphabetically') ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isActive('length') ? '' : 'is-light'}`}
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

        {isResetVisible && (
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
