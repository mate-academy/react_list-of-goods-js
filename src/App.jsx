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

const SORT_FIELD_BY_LENGTH = 'length';
const SORT_FIELD_BY_ALPHABET = 'alpha';

function getPreperedGoods(goods, typeSort, isReverse) {
  const copyGoods = [...goods];

  if (typeSort) {
    copyGoods.sort((a, b) => {
      switch (typeSort) {
        case SORT_FIELD_BY_ALPHABET:
          return a.localeCompare(b);

        case SORT_FIELD_BY_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  return isReverse ? copyGoods.reverse() : copyGoods;
}

export const App = () => {
  const [onReverse, setOnReverse] = useState(false);
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreperedGoods(goodsFromServer, sortField, onReverse);

  function handleSort(field) {
    if (field === !onReverse) {
      return setOnReverse(field);
    }

    if (field === '') {
      return setSortField('') || setOnReverse('');
    }

    return setSortField(field);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_BY_ALPHABET,
          })}
          onClick={() => {
            handleSort(SORT_FIELD_BY_ALPHABET);
          }}
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_BY_LENGTH,
          })}
          onClick={() => {
            handleSort(SORT_FIELD_BY_LENGTH);
          }}
          type="button"
        >
          Sort by length
        </button>

        <button
          className={cn('button is-warning ', {
            'is-light': !onReverse,
          })}
          onClick={() => {
            handleSort(!onReverse);
          }}
          type="button"
        >
          Reverse
        </button>

        {(sortField || onReverse) && (
          <button
            onClick={() => {
              handleSort('');
            }}
            type="button"
            className="button is-danger is-light"
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
