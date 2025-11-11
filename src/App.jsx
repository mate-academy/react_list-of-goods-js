import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { GoodList } from './components/GoodList/GoodList';

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

function getSortedGoods(goods, { sortBy, isReversed }) {
  const sortedGoods = [...goods];

  if (sortBy === 'alphabetically') {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === 'length') {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const isModified = sortBy !== null || isReversed;
  const goods = getSortedGoods(goodsFromServer, { sortBy, isReversed });

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortBy(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== 'alphabetically',
          })}
          onClick={() => setSortBy('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== 'length',
          })}
          onClick={() => setSortBy('length')}
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

        {isModified && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={goods} />
    </div>
  );
};
