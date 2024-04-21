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

const SORT_BY_ABC = 'abc';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [sort, setSort] = useState('');
  const [reverse, setReverse] = useState(false);
  const sortedGoods = [...goodsFromServer];

  if (sort) {
    sortedGoods.sort((a, b) => {
      switch (sort) {
        case SORT_BY_ABC:
          return a.localeCompare(b);
        case SORT_BY_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sort !== SORT_BY_ABC && 'is-light'}`}
          onClick={() => {
            setSort(SORT_BY_ABC);
          }}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sort !== SORT_BY_LENGTH && 'is-light'}`}
          onClick={() => {
            setSort(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse || 'is-light'}`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sort || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSort('');
              setReverse();
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
