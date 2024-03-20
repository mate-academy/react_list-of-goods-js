import React, { useState } from 'react';
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

const SORT_DEFAULT = '';
const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, order }) {
  let sorting = null;
  const newGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_NAME:
        sorting = (good1, good2) => good1.localeCompare(good2);
        break;
      case SORT_FIELD_LENGTH:
        sorting = (good1, good2) => good1.length - good2.length;

        break;

      default:
        break;
    }

    newGoods.sort(sorting);
  }

  if (order) {
    newGoods.reverse();
  }

  return newGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_DEFAULT);
  const [order, setOrder] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    order,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !order,
          })}
          onClick={() => setOrder(!order)}
        >
          Reverse
        </button>

        {(sortField || order) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SORT_DEFAULT);
              setOrder(false);
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
