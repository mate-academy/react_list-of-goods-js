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

const SORT_BY_ALPHABET = 'alphabetically';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, sortField, reverse) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
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
  const [sortField, setSortField] = useState('');
  const [reverse, setreverse] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => (
            setSortField(SORT_BY_ALPHABET))}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => (
            setSortField(SORT_BY_LENGTH)
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setreverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse)
        && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setSortField('');
            setreverse(false);
          }}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
