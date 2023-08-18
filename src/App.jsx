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

const SORT_FIELD_ALPHA = 'alpha';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortType, reverse) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((a, b) => {
      switch (sortType) {
        case SORT_FIELD_ALPHA:
          return a.localeCompare(b);

        case SORT_FIELD_LENGTH:
          return a.length - b.length;

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
  const [sortField, setSortField] = useState('');
  const [sortReverse, setSortReverse] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    sortReverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHA)}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHA,
          })}
          type="button"
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
          onClick={() => setSortReverse(!sortReverse)}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !sortReverse,
          })}
        >
          Reverse
        </button>

        {(sortField || sortReverse) && (
          <button
            onClick={() => {
              setSortField('');
              setSortReverse(false);
            }}
            className="button is-danger is-light"
            type="button"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))
        }
      </ul>
    </div>
  );
};
