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

function getVisibleGoods(goods, sortType, isReversed) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case 'alphabetically':
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case 'length':
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  // Перевертаємо масив, якщо потрібно
  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export function App() {
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = type => {
    
  };

  const resetSort = () => {
    setSortType(null);
    setIsReversed(false);
  };

  const visibleGoods = getVisibleGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => handleSort('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortType === 'reverse' ? '' : 'is-light'}`}
          onClick={() => handleSort('reverse')}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
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
}
