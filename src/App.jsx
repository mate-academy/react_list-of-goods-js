import { useState } from 'react';
import cn from 'classnames';

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

const SORT_NAME = 'name';
const SORT_LENGTH = 'length';

function getPreparedGoods(goods, { sort, reverse }) {
  const preparedGoods = [...goods];

  if (sort) {
    preparedGoods.sort((good1, good2) => {
      switch (sort) {
        case SORT_NAME:
          return good1.localeCompare(good2);

        case SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sort, setSort] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGood = getPreparedGoods(goodsFromServer, { sort, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(`button is-info`, { 'is-light': sort !== SORT_NAME })}
          onClick={() => setSort(SORT_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(`button is-success`, { 'is-light': sort !== SORT_LENGTH })}
          onClick={() => setSort(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverse })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sort || reverse)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSort('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGood.map(value => (
          <li
            data-cy="Good"
            key={value}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
