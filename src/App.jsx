import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

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

function getSortedGoods(goods, sortField, isReversed) {
  const sortedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_NAME:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_FIELD_LENGTH:
      sortedGoods.sort((a, b) => {
        const diff = a.length - b.length;

        return diff !== 0 ? diff : a.localeCompare(b);
      });
      break;

    default:
      break;
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

function areArraysEqual(a, b) {
  return a.length === b.length && a.every((item, i) => item === b[i]);
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = getSortedGoods(goodsFromServer, sortField, isReversed);

  const shouldShowReset = !areArraysEqual(sortedGoods, goodsFromServer);

  function handleSortByName() {
    setSortField(SORT_FIELD_NAME);
  }

  function handleSortByLength() {
    setSortField(SORT_FIELD_LENGTH);
  }

  function handleToggleReverse() {
    setIsReversed(prev => !prev);
  }

  function handleReset() {
    setSortField('');
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortField === SORT_FIELD_NAME ? '' : 'is-light'
          }`}
          onClick={handleSortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortField === SORT_FIELD_LENGTH ? '' : 'is-light'
          }`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {shouldShowReset && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
