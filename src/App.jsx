import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
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

const SORT_TYPE_ALPHABETICAL = 'alphabetical';
const SORT_TYPE_LENGTH = 'length';
const SORT_TYPE_DEFAULT = 'default';

const sortGoods = (type, reverse) => {
  const newGoods = [...goodsFromServer];

  switch (type) {
    case SORT_TYPE_ALPHABETICAL:
      newGoods.sort();
      break;
    case SORT_TYPE_LENGTH:
      newGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverse) {
    newGoods.reverse();
  }

  return newGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState(SORT_TYPE_DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = type => {
    setSortType(type);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortType(SORT_TYPE_DEFAULT);
    setIsReversed(false);
  };

  const sortedGoods = sortGoods(sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT_TYPE_ALPHABETICAL,
          })}
          onClick={() => handleSort(SORT_TYPE_ALPHABETICAL)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_TYPE_LENGTH,
          })}
          onClick={() => handleSort(SORT_TYPE_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SORT_TYPE_DEFAULT || isReversed) && (
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
