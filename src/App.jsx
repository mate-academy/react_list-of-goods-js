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

const SORT_BY_NAME = 'alph';
const SORT_BY_LENGTH = 'length';

function sortGoods(goods, { sortType, isReversed }) {
  const copyOfGoods = [...goods];

  copyOfGoods.sort((good1, good2) => {
    switch (sortType) {
      case SORT_BY_NAME:
        return good1.localeCompare(good2);
      case SORT_BY_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    copyOfGoods.reverse();
  }

  return copyOfGoods;
}

export const App = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState('');
  const sortedGoods = sortGoods(goodsFromServer, { sortType, isReversed });
  const resetFilter = () => {
    setReversed(false);
    setSortType('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortType !== SORT_BY_NAME },
          )}
          onClick={() => {
            setSortType(SORT_BY_NAME);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortType !== SORT_BY_LENGTH },
          )}
          onClick={() => {
            setSortType(SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': isReversed === false },
          )}
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
        <button
          type="button"
          className={cn(
            'button is-danger is-light',
          )}
          onClick={resetFilter}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
