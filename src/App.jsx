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

export const App = () => {
  const [sortBy, setSortBy] = useState('');

  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer].sort((a, b) => {
    if (sortBy === 'alphabet') {
      return a.localeCompare(b);
    }

    if (sortBy === 'length') {
      return a.length - b.length;
    }

    return 0;
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isModified = sortBy !== '' || isReversed;

  const handleReset = () => {
    setSortBy('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          // Якщо sortBy === 'alphabet', клас 'is-light' не додається
          className={`button is-info ${sortBy !== 'alphabet' ? 'is-light' : ''}`}
          onClick={() => setSortBy('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== 'length' ? 'is-light' : ''}`}
          onClick={() => setSortBy('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
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
