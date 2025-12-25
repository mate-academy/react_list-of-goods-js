import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

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

const sortFunctions = {
  alpha: (arr) => arr.slice().sort((a, b) => a.localeCompare(b)),
  length: (arr) => arr.slice().sort((a, b) => a.length - b.length),
};

export const App = () => {
  const original = goodsFromServer;
  const [goods, setGoods] = useState(original);
  const [sortBy, setSortBy] = useState(null); // 'alpha' | 'length' | null
  const [isReversed, setIsReversed] = useState(false);

  const computeGoods = (sortKey, reversed) => {
    let result = original.slice();
    if (sortKey && sortFunctions[sortKey]) result = sortFunctions[sortKey](result);
    if (reversed) result = result.slice().reverse();
    return result;
  };

  const handleSort = (key) => {
    setSortBy(key);
    setGoods(computeGoods(key, isReversed));
  };

  const handleReverse = () => {
    const newRev = !isReversed;
    setIsReversed(newRev);
    setGoods(computeGoods(sortBy, newRev));
  };

  const handleReset = () => {
    setSortBy(null);
    setIsReversed(false);
    setGoods(original);
  };

  const isOriginalOrder = goods.join('|') === original.join('|');

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortBy === 'alpha' ? 'button is-info' : 'button is-info is-light'}
          onClick={() => handleSort('alpha')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortBy === 'length' ? 'button is-success' : 'button is-success is-light'}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed ? 'button is-warning' : 'button is-warning is-light'}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button type="button" className="button is-danger" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((g) => (
          <li key={g} data-cy="Good">
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
};
