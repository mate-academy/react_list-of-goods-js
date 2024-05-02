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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';
const YES = 'yes';
const NO = 'no';
const INITIAL = 'initial';

function getPreparedGoods(goods, { sortField, reverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case INITIAL:
        default:
          return 0;
      }
    });

    if (reverse === YES) {
      return preparedGoods.sort(() => -1);
    }

    if (reverse === NO) {
      return preparedGoods.sort(() => 0);
    }
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(INITIAL);
  const [reverse, setReverse] = useState(NO);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_NAME);
            setReverse(NO);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
            setReverse(NO);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverse !== YES,
          })}
          onClick={() => {
            if (reverse === NO || sortField === INITIAL) {
              setReverse(YES);
            }

            if (reverse === YES) {
              setReverse(NO);
            }
          }}
        >
          Reverse
        </button>

        <button
          style={{
            display: sortField === INITIAL && reverse === NO ? 'none' : 'block',
          }}
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSortField(INITIAL);
            setReverse(NO);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
