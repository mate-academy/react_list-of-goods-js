import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

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
const ALPHABET = 'alphabet';
const LENGTH = 'length';

const sortGoods = (goods, sortType, isReverse) => {
  const sortedGoods = [...goods];

  switch (sortType) {
    case ALPHABET:
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case LENGTH:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [activeSort, setActiveSort] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const goods = sortGoods(goodsFromServer, activeSort, isReverse);

  const sortAlphabetically = () => {
    setActiveSort(ALPHABET);
  };

  const sortByLength = () => {
    setActiveSort(LENGTH);
  };

  const goodsReverse = () => {
    setIsReverse(prev => !prev);
  };

  const goodsReset = () => {
    setActiveSort('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': activeSort !== ALPHABET,
          })}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': activeSort !== LENGTH,
          })}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': isReverse === false,
          })}
          onClick={goodsReverse}
        >
          Reverse
        </button>

        {(activeSort || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={goodsReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
