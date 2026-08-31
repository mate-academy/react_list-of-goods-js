import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';

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
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = [...goodsFromServer].sort((a, b) => {
    if (sortType === 'alphabetical') {
      return a.localeCompare(b);
    }

    if (sortType === 'length') {
      return a.length - b.length || a.localeCompare(b);
    }

    return 0;
  });

  if (isReversed) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === 'alphabetical' ? '' : 'is-light'
          }`}
          onClick={() => {
            setSortType('alphabetical');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === 'length' ? '' : 'is-light'
          }`}
          onClick={() => {
            setSortType('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortType !== null || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortType(null);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
