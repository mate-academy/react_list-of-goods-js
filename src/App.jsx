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
  const [sortType, setSortType] = useState(null); // 'alphabet' | 'length' | null
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = type => {
    setSortType(type);
    setIsReversed(false); // 🔁 обязательно сбрасываем реверс
  };

  const handleReset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const getVisibleGoods = () => {
    const result = [...goodsFromServer];

    if (sortType === 'alphabet') {
      result.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'length') {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  const visibleGoods = getVisibleGoods();
  const isInitial = sortType === null && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== 'alphabet' ? 'is-light' : ''}`}
          onClick={() => handleSort('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== 'length' ? 'is-light' : ''}`}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {!isInitial && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
