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
const SORT_FIELD_BY_LENGTH = 'byLength';
const REVERSE_SORT_FIELD_BY_LENGTH = 'byLengthReversed';
const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const REVERSE_SORT_FIELD_ALPHABETICALLY = 'alphabeticallyReversed';

function getPreparedGoods(goods, { sortField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_BY_LENGTH:
          return good2.length - good1.length;
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case REVERSE_SORT_FIELD_BY_LENGTH:
          return good1.length - good2.length;
        case REVERSE_SORT_FIELD_ALPHABETICALLY:
          return good2.localeCompare(good1);
        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField });

  return (

    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          className={cn('button', 'is-info',
            sortField === SORT_FIELD_ALPHABETICALLY
            || sortField === REVERSE_SORT_FIELD_ALPHABETICALLY
              ? null : 'is-light')}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-info',
            sortField === SORT_FIELD_BY_LENGTH
            || sortField === REVERSE_SORT_FIELD_BY_LENGTH ? null : 'is-light')}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            if (sortField === SORT_FIELD_ALPHABETICALLY) {
              setSortField(REVERSE_SORT_FIELD_ALPHABETICALLY);
            } else if (sortField === SORT_FIELD_BY_LENGTH) {
              setSortField(REVERSE_SORT_FIELD_BY_LENGTH);
            } else if (sortField === REVERSE_SORT_FIELD_ALPHABETICALLY) {
              setSortField(SORT_FIELD_ALPHABETICALLY);
            } else if (sortField === REVERSE_SORT_FIELD_BY_LENGTH) {
              setSortField(SORT_FIELD_BY_LENGTH);
            }
          }}
          className={cn('button', 'is-warning',
            sortField === REVERSE_SORT_FIELD_ALPHABETICALLY
          || sortField === REVERSE_SORT_FIELD_BY_LENGTH ? null : 'is-light')}
        >
          Reverse
        </button>

        {sortField !== '' && (
        <button
          type="button"
          onClick={() => setSortField('')}
          className="button is-danger is-light"
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
