import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import clsx from 'clsx';
import './App.scss';

function sortAlphabetically(good1, good2) {
  return good1.localeCompare(good2);
}

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

function getPreparedGoods(goods, { sortField, sortOrder }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case 'alphabetically':
          return sortAlphabetically(good1, good2);

        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (sortOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    sortOrder,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={clsx('button is-primary', {
            'is-light': sortField !== 'alphabetically',
          })}
          onClick={() => setSortField('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={clsx('button is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={clsx('button is-warning', { 'is-light': !sortOrder })}
          onClick={() => setSortOrder(!sortOrder)}
        >
          Reverse
        </button>
        {(sortField || sortOrder) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setSortOrder(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
