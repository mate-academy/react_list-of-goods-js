import { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

export const initialGoods = [
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

const SORT_BY_NAME = 'alphabet';
const SORT_BY_SIZE = 'length';

function sortGoods(goods, { sortType, isDescending }) {
  const sorted = [...goods];

  if (sortType) {
    sorted.sort((a, b) => {
      switch (sortType) {
        case SORT_BY_NAME:
          return a.localeCompare(b);
        case SORT_BY_SIZE:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isDescending) {
    sorted.reverse();
  }

  return sorted;
}

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [isDescending, setIsDescending] = useState(false);

  const displayGoods = sortGoods(initialGoods, {
    sortType,
    isDescending,
  });

  const handleReverse = () => {
    setIsDescending(prev => !prev);
  };

  const handleReset = () => {
    setSortType(null);
    setIsDescending(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SORT_BY_NAME ? '' : 'is-light'}`}
          onClick={() => setSortType(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SORT_BY_SIZE ? '' : 'is-light'}`}
          onClick={() => setSortType(SORT_BY_SIZE)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isDescending ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType || isDescending) && (
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
        {displayGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
