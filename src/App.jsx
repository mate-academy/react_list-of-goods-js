import 'bulma/css/bulma.css';
import './App.scss';
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
const SORT_MODE_ALPHABET = 'alphabet';
const SORT_MODE_LENGTH = 'length';

function setSort(goods, sortType, isReverse) {
  const sortedGoods = [...goods];

  switch (sortType) {
    case SORT_MODE_ALPHABET:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_MODE_LENGTH:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortMode, setSortMode] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = setSort(goodsFromServer, sortMode, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortMode === SORT_MODE_ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortMode(SORT_MODE_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={
            sortMode === SORT_MODE_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            setSortMode(SORT_MODE_LENGTH);
          }}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={
            isReverse ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => {
            setIsReverse(reverse => !reverse);
          }}
        >
          Reverse
        </button>
        {(sortMode || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortMode('');
              setIsReverse(false);
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
