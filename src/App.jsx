import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import { sortByField } from './Utils/Utils';
import { SORT_FIELD } from './constants';

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
  const [sortField, setSortField] = useState(SORT_FIELD.DEFAULT);
  const [reverse, setReverse] = useState(false);
  const sortedGoods = [...goodsFromServer];

  sortByField(sortField, sortedGoods);

  if (reverse) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD.ABC && 'is-light'}`}
          onClick={() => {
            setSortField(SORT_FIELD.ABC);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD.LENGTH && 'is-light'}`}
          onClick={() => {
            setSortField(SORT_FIELD.LENGTH);
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

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
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
