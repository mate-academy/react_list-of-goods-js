import React, { useState } from 'react';
import classNames from 'classnames';
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

const SORT_ORDER_ALPHABETICALLY = 'alphabetically';
const SORT_ORDER_LENGTH = 'length';
const SORT_ORDER_INITIAL = 'initial';

function getPreparedGoods(goods, reverse, sortOrder) {
  const preparedGoods = [...goods];

  if (sortOrder && sortOrder !== SORT_ORDER_INITIAL) {
    preparedGoods.sort((a, b) => {
      switch (sortOrder) {
        case SORT_ORDER_LENGTH:
          return a.length - b.length;
        case SORT_ORDER_ALPHABETICALLY:
          return a.localeCompare(b);
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortOrder, setSortOrder] = useState(SORT_ORDER_INITIAL);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, isReversed, sortOrder);

  const handleSort = type => {
    setSortOrder(type);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortOrder(SORT_ORDER_INITIAL);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': sortOrder !== SORT_ORDER_ALPHABETICALLY,
          })}
          onClick={() => handleSort(SORT_ORDER_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': sortOrder !== SORT_ORDER_LENGTH,
          })}
          onClick={() => handleSort(SORT_ORDER_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortOrder !== SORT_ORDER_INITIAL || isReversed) && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
