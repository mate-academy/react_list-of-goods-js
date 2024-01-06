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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';
const REVERSE = 'reverse';

function getPreparedGoods(goods, sortField) {
  const preparedGoods = [...goods];

  if (sortField.field) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField.field) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
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

const initialGoods = { field: '', order: '' };

export const App = () => {
  const [sortField, setSortField] = useState(initialGoods);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField);
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
            'is-light': sortField.field !== SORT_ALPHABETICALLY,
          })}
          onClick={() => {
            setSortField({ ...sortField, field: SORT_ALPHABETICALLY });
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField.field !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortField({ ...sortField, field: SORT_BY_LENGTH });
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
            onClick={() => setSortField(initialGoods)}
          >
            Reset
          </button>
        )}
      </div>

      {visibleGoods.map(good => (
        <li
          data-cy="Good"
          key={good}
        >
          {good}
        </li>
      ))}
    </div>
  );
};
