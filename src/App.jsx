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
const SORT_FIELD_APHABET = 'ALPABET';
const SORT_FIELD_LENGTH = 'LENGTH';
const SORT_FIELD_REVERSE = 'REVERSE';

function getPreparedGoods(goods, sortField) {
  const preperedgoods = [...goods];

  if (sortField) {
    if (sortField === SORT_FIELD_REVERSE) {
      preperedgoods.reverse();
    } else {
      preperedgoods.sort((good1, good2) => {
        switch (sortField) {
          case SORT_FIELD_APHABET:
            return good1.localeCompare(good2);

          case SORT_FIELD_LENGTH:
            return good1.length - good2.length;

          default:
            return 0;
        }
      });
    }
  }

  return preperedgoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortField !== SORT_FIELD_APHABET,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_APHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortField !== SORT_FIELD_REVERSE,
          })}
          onClick={() => {
            setSortField(
              sortField === SORT_FIELD_REVERSE ? '' : SORT_FIELD_REVERSE,
            );
          }}
        >
          Reverse
        </button>

        {sortField !== '' && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
            }}
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
