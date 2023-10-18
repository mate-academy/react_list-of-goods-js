/* eslint-disable max-len */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const App = () => {
  const initialGoods = [
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

  const [goods, setGoods] = useState(initialGoods);
  const [sortOrder, setSortOrder] = useState('initial');
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = (order) => {
    let sortedGoods = [...goods];

    if (isReversed) {
      sortedGoods.reverse();
    } else {
      switch (order) {
        case 'alphabetical':
          sortedGoods.sort((a, b) => a.localeCompare(b));
          break;
        case 'length':
          sortedGoods.sort((a, b) => a.length - b.length);
          break;
        case 'reverse':
          sortedGoods.reverse();
          break;
        case 'initial':
          sortedGoods = initialGoods;
          break;
        default:
          break;
      }
    }

    setGoods(sortedGoods);
    setSortOrder(order);
  };

  const showResetButton = sortOrder !== 'initial';

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', { 'is-light': sortOrder !== 'alphabetical' })}
          onClick={() => handleSort('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', { 'is-light': sortOrder !== 'length' })}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', { 'is-light': sortOrder !== 'reverse' })}
          onClick={() => {
            handleSort(sortOrder === 'reverse' ? 'initial' : 'reverse');
            handleReverse();
          }}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => handleSort('initial')}
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
