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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortOption, isReverse) {
  const preparedGoods = [...goods];

  switch (sortOption) {
    case SORT_FIELD_NAME:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_FIELD_LENGTH:
      preparedGoods.sort((a, b) => {
        if (a.length === b.length) {
          return a.localeCompare(b); // стабільність
        }
        return a.length - b.length;
      });
      break;

    default:
      break;
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

function arraysAreEqual(arr1, arr2) {
  return arr1.length === arr2.length && arr1.every((el, i) => el === arr2[i]);
}

export const App = () => {
  const [sortOption, setSortOption] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortOption, isReverse);

  // === Handlers ===
  const handleSortAlphabetically = () => setSortOption(SORT_FIELD_NAME);
  const handleSortByLength = () => setSortOption(SORT_FIELD_LENGTH);
  const handleReverse = () => setIsReverse(value => !value);
  const handleReset = () => {
    setSortOption('');
    setIsReverse(false);
  };

  const isChanged = !arraysAreEqual(visibleGoods, goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortAlphabetically}
          className={cn('button', 'is-info', {
            'is-light': sortOption !== SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortByLength}
          className={cn('button', 'is-success', {
            'is-light': sortOption !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-light"
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
