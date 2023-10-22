import { useState } from 'react';

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

const SORT_FIELD_NAME = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';
const SORT_FIELD_RESET = 'Reset';

function getPreparedGoods(goods, sortField, isReversed) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return preparedGoods;
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
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortField === SORT_FIELD_NAME
            ? 'button is-info'
            : 'button is-info is-light'
          }
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortField === SORT_FIELD_LENGTH
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {sortField && (
        <button
          type="button"
          className={sortField === SORT_FIELD_RESET
            ? 'button is-danger'
            : 'button is-danger is-light'}
          onClick={() => setSortField('')}
        >
          Reset
        </button>
        )
        }
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">
            {good}
            {' '}
          </li>
        ))}
      </ul>
    </div>
  );
};
