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

export const App = () => {
  const [sortType, setSortType] = useState('default');
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = (type, reverse) => {
    const newGoods = [...goodsFromServer];

    switch (type) {
      case 'alphabetical':
        newGoods.sort();
        break;
      case 'length':
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

  const handleSort = type => {
    setSortType(type);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortType('default');
    setIsReversed(false);
  };

  const sortedGoods = sortGoods(sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== 'alphabetical',
          })}
          onClick={() => handleSort('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== 'length',
          })}
          onClick={() => handleSort('length')}
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

        {(sortType !== 'default' || isReversed) && (
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
