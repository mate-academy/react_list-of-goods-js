import React, { useState } from 'react';
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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_DEFAULT = 'default';

function sortAlphabetically(a, b) {
  return a.localeCompare(b);
}

function sortByLength(a, b) {
  return a.length - b.length;
}

function getPreparedGoods(goods, sortField, isReversed) {
  let copiedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_ALPHABETICALLY:
      copiedGoods.sort(sortAlphabetically);
      break;
    case SORT_FIELD_LENGTH:
      copiedGoods.sort(sortByLength);
      break;
    default:
      copiedGoods = [...goods];
      break;
  }

  if (isReversed) {
    copiedGoods.reverse();
  }

  return copiedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELD_DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const isInitialOrder = sortField === SORT_FIELD_DEFAULT && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_FIELD_ALPHABETICALLY && !isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABETICALLY);
            setIsReversed(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_FIELD_LENGTH && !isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
            setIsReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className={`button is-danger ${isInitialOrder ? '' : 'is-light'}`}
            onClick={() => {
              setSortField(SORT_FIELD_DEFAULT);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
