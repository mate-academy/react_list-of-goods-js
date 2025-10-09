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
  const initialGoods = goodsFromServer;

  const [sortType, setSortType] = useState('none');
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = (arr, type) => {
    const copy = [...arr];

    if (type === 'alpha') {
      return copy.sort((a, b) => a.localeCompare(b));
    }

    if (type === 'length') {
      return copy.sort((a, b) => a.length - b.length || a.localeCompare(b));
    }

    return copy;
  };

  const getSortedGoods = () => {
    const base = sortGoods(initialGoods, sortType);

    return isReversed ? [...base].reverse() : base;
  };

  const goods = getSortedGoods();

  const handleSortAlpha = () => {
    setSortType('alpha');
  };

  const handleSortLength = () => {
    setSortType('length');
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType('none');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortAlpha}
          className={`button is-info ${sortType === 'alpha' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortLength}
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortType !== 'none' || isReversed) && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger"
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
