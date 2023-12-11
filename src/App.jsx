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

const ALPHABETICAL_SORT = 'alphabetical';
const LENGTH_SORT = 'length';

const sortByAlphabetically = (goods, isReversed) => (
  isReversed ? [...goods].sort().reverse() : [...goods].sort()
);

const sortByLength = (goods, isReversed) => (
  [...goods].sort((a, b) => (
    isReversed ? b.length - a.length : a.length - b.length))
);

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(null);

  const shouldReset = sortedGoods.join('') !== goodsFromServer.join('');

  const metodSort = (sortingFunction, type) => {
    if (!isReversed || (isReversed && sortType !== type)) {
      const sortedGood = sortingFunction(goodsFromServer, isReversed);

      setSortedGoods(sortedGood);
      setSortType(type);
    }
  };

  const reverseOrder = () => {
    const reverOrder = [...sortedGoods].reverse();

    setSortedGoods(reverOrder);
    setIsReversed(!isReversed);
  };

  const resetOrder = () => {
    setSortedGoods([...goodsFromServer]);
    setIsReversed(false);
    setSortType(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortType !== ALPHABETICAL_SORT },
          )}
          onClick={() => metodSort(sortByAlphabetically, ALPHABETICAL_SORT)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames(
              'button',
              'is-success',
              { 'is-light': sortType !== LENGTH_SORT },
            )}
          onClick={() => metodSort(sortByLength, LENGTH_SORT)}

        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames(
              'button',
              'is-warning',
              { 'is-light': !isReversed },
            )}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {shouldReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetOrder}
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
