import React, { useState } from 'react';
import classNames from 'classnames';
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
const SORT_ALPHABETICALLY = 'alphabetical order';
const SORT_LENGTH = 'length sort';

function getPreparedGoods(goods, sortField, query) {
  const listOfPreparedGoods = [...goods];

  if (sortField) {
    listOfPreparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });

    if (query) {
      listOfPreparedGoods.reverse();
    }
  }

  return listOfPreparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [query, setIsReverseField] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, query);

  const isOriginalOrder = sortField === '' && !query;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortField !== SORT_ALPHABETICALLY,
          })}
          onClick={() => {
            setSortField(SORT_ALPHABETICALLY);
            setIsReverseField(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortField !== SORT_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_LENGTH);
            setIsReverseField(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': query,
          })}
          onClick={() => {
            setIsReverseField(!query);
            setSortField('');
          }}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReverseField(false);
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
