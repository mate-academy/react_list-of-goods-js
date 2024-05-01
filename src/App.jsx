import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

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
const SORT_BY_ALPHABET = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';
const REVERSE = 'Reverse';
const RESET = 'Reset';

function getVisibleGoods(goods, sortType, reverse = false) {
  const sortedGoods = [...goods];

  switch (sortType) {
    case SORT_BY_ALPHABET:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_BY_LENGTH:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const handleRevers = () => {
    setIsReversed(!isReversed);
  };

  const handleSort = sortType => {
    setSortField(sortType);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortField('');
  };

  const visibleGoods = getVisibleGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info  ${sortField !== SORT_BY_ALPHABET && 'is-light'}`}
          onClick={() => handleSort(SORT_BY_ALPHABET)}
        >
          {SORT_BY_ALPHABET}
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_BY_LENGTH && 'is-light'}`}
          onClick={() => handleSort(SORT_BY_LENGTH)}
        >
          {SORT_BY_LENGTH}
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleRevers}
        >
          {REVERSE}
        </button>

        {visibleGoods.join() !== goodsFromServer.join() && (
          <button type="button" className="button" onClick={handleReset}>
            {RESET}
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
