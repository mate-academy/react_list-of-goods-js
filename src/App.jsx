import { useState } from 'react';

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

const SORT_BY_ALPHABET = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sort, setSort] = useState({ type: '', reversed: false });

  // function for sort by length and alphabet
  const handleSort = type => {
    const sortedGoods = [...goodsFromServer];

    if (type === SORT_BY_ALPHABET) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (type === SORT_BY_LENGTH) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (sort.reversed) {
      sortedGoods.reverse();
    }

    setSort({ type, reversed: sort.reversed });
    setVisibleGoods(sortedGoods);
  };

  // function for reverse
  const handleReverse = () => {
    const reversedGoods = [...visibleGoods].reverse();

    setSort(prev => ({ ...prev, reversed: !prev.reversed }));
    setVisibleGoods(reversedGoods);
  };

  // function for reset
  const handleReset = () => {
    setSort({ type: '', reversed: false });
    setVisibleGoods(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${sort.type === SORT_BY_ALPHABET ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sort.type === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${sort.reversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {sort.type || sort.reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
