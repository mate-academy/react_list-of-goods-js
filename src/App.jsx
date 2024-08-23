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

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getVisibleGoods(goodsFromServer, sortType, isReversed);

  const resetOrder = () => {
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', { 'is-light': sortType !== 'alphabetical' })}
          onClick={() => setSortType('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', { 'is-light': sortType !== 'byLength' })}
          onClick={() => setSortType('byLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={classNames('button', 'is-danger', { 'is-light': !sortType && !isReversed })}
          onClick={resetOrder}
          disabled={!sortType && !isReversed}
        >
          Reset
        </button>
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

const getVisibleGoods = (goods, currentSortType, isReversed) => {
  let goodsCopy = [...goods];

  switch (currentSortType) {
    case 'alphabetical':
      goodsCopy.sort((a, b) => a.localeCompare(b));
      break;
    case 'byLength':
      goodsCopy.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};
