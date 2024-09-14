import { useState } from 'react';
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

const sortTypes = {
  byAlphabet: 'alphabet',
  byLength: 'length',
};

const sortList = (items, sortType, isReversed) => {
  const newItems = [...items];

  switch (sortType) {
    case sortTypes.byAlphabet:
      newItems.sort((a, b) => a.localeCompare(b));
      break;
    case sortTypes.byLength:
      newItems.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    newItems.reverse();
  }

  return newItems;
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = sortList(goodsFromServer, sortType, isReversed);
  const isResettable = sortType || isReversed;

  const handleSort = newSortType => {
    setSortType(newSortType);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== sortTypes.byAlphabet,
          })}
          onClick={() => {
            handleSort(sortTypes.byAlphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== sortTypes.byLength,
          })}
          onClick={() => {
            handleSort(sortTypes.byLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResettable && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
