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

const SORT_FIELD_ALPH = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';
const REVERSE = 'reverse';

function getSortedGoods(goods, sortField) {
  const preparedGoods = [...goods];

  if (sortField.field) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField.field) {
        case SORT_FIELD_ALPH:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (sortField.order) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

const initialState = { field: '', order: '' };

export const App = () => {
  const [sortField, setSortField] = useState(initialState);
  const visibleGoods = getSortedGoods(goodsFromServer, sortField);
  const isShowReset = sortField.field || sortField.order;

  const handleReverse = () => {
    if (sortField.order) {
      setSortField({ ...sortField, order: '' });

      return;
    }

    setSortField({ ...sortField, order: REVERSE });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField.field !== SORT_FIELD_ALPH,
          })}
          onClick={() => setSortField({ ...sortField, field: SORT_FIELD_ALPH })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField.field !== SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortField({ ...sortField, field: SORT_FIELD_LENGTH });
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': sortField.order !== REVERSE,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isShowReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortField(initialState)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
