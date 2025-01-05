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
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = field => {
    const sortedGoods = [...goodsFromServer];

    if (field === 'Sort alphabetically') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (field === 'Sort by length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setSortField(field);
    setGoods(sortedGoods);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
    setGoods(prevGoods => [...prevGoods].reverse());
  };

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
    setGoods(goodsFromServer);
  };

  const areArraysEqual = (arr1, arr2) =>
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index]);

  const isResetVisible = !areArraysEqual(goods, goodsFromServer) || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        {['Sort alphabetically', 'Sort by length'].map(field => (
          <button
            key={field}
            type="button"
            className={cn(
              'button',
              { 'is-light': sortField !== field },
              { 'is-success': sortField === field },
            )}
            onClick={() => handleSort(field)}
          >
            {field}
          </button>
        ))}

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
