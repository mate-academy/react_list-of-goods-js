import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        case SORT_BY_NAME:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_NAME)}
          type="button"
          className={cn(
            'button',
            'is-info',
            {
              'is-light': sortField !== SORT_BY_NAME,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={cn(
            'button',
            'is-success',
            {
              'is-light': sortField !== SORT_BY_LENGTH,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => (setIsReversed(!isReversed))}
          type="button"
          className={cn(
            'button',
            'is-warning',
            {
              'is-light': isReversed !== true,
            },
          )}
        >
          Reverse
        </button>

        {(sortField !== '' || isReversed) && (
          <button
            onClick={() => {
              setSortField('');
              setIsReversed(false);
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
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))
        }
      </ul>
    </div>
  );
};
