import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

const SORT_FIELD_ABC = 'abc';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_DEFAULT = '';

function getPreparedGoods(goods, { sortField, isReverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'abc':
          return good1.localeCompare(good2);

        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELD_DEFAULT);
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });

  function reset() {
    setSortField(SORT_FIELD_DEFAULT);
    setIsReverse(false);
  }

  function toggleReverse() {
    setIsReverse(prev => !prev);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ABC)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ABC,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {(sortField || isReverse)
        && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
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
