import React, { useState } from 'react';
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortOrder, setSortOrder] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const applySort = sortType => {
    const sortedGoods = [...goodsFromServer];

    if (sortType === SORT_BY_ALPHABET) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SORT_BY_LENGTH) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setSortOrder(sortType);
  };

  const handleReverse = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortOrder('');
    setIsReversed(false);
  };

  const isResetButtonVisible = sortOrder || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortOrder !== SORT_BY_ALPHABET,
          })}
          onClick={() => applySort(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortOrder !== SORT_BY_LENGTH,
          })}
          onClick={() => applySort(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>
        {isResetButtonVisible && (
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
