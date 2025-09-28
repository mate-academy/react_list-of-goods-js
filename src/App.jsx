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

const SORT_FIELD_AB = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_AB:
      return preparedGoods.sort((a, b) => a.localeCompare(b));

    case SORT_FIELD_LENGTH:
      return preparedGoods.sort((a, b) => a.length - b.length);

    default:
      return preparedGoods;
  }
}

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = field => {
    setSortField(field);
    const sorted = getPreparedGoods(goodsFromServer, field);

    setGoods(isReversed ? [...sorted].reverse() : sorted);
  };

  const handleReverse = () => {
    const newReversed = !isReversed;

    setIsReversed(newReversed);

    let prepared = sortField
      ? getPreparedGoods(goodsFromServer, sortField)
      : [...goodsFromServer];

    if (newReversed) {
      prepared = [...prepared].reverse();
    }

    setGoods(prepared);
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortField(null);
    setIsReversed(false);
  };

  const isOriginalOrder =
    JSON.stringify(goods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_FIELD_AB ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT_FIELD_AB)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={() => handleSort(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
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
