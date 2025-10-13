import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_NAME = 'name';
const SORT_ORDER_REVERSE = 'reverse';

function getPreparedGoods(goods, { sortField, sortOrder }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (sortOrder === SORT_ORDER_REVERSE) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    sortOrder,
  });

  function handleSortAlphabetically() {
    setSortField(SORT_FIELD_NAME);
  }

  function handleSortByLength() {
    setSortField(SORT_FIELD_LENGTH);
  }

  function handleChangeOrder() {
    if (sortOrder === SORT_ORDER_REVERSE) {
      setSortOrder('');
    } else {
      setSortOrder(SORT_ORDER_REVERSE);
    }
  }

  function handleReset() {
    setSortOrder('');
    setSortField('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortAlphabetically}
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortByLength}
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleChangeOrder}
          className={cn('button is-warning', {
            'is-light': sortOrder !== SORT_ORDER_REVERSE,
          })}
        >
          Reverse
        </button>

        {(sortField !== '' || sortOrder !== '') && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
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
