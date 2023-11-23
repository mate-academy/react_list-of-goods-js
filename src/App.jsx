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
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(null);

  const sortAlphabetically = () => {
    if (!isReversed || (isReversed && sortType !== 'alphabetical')) {
      const orderAbc = isReversed
        ? [...sortedGoods].sort().reverse()
        : [...sortedGoods].sort();

      setSortedGoods(orderAbc);
      setSortType('alphabetical');
    }
  };

  const sortByLength = () => {
    if (!isReversed || (isReversed && sortType !== 'length')) {
      const orderLength = isReversed
        ? [...sortedGoods].sort((a, b) => b.length - a.length)
        : [...sortedGoods].sort((a, b) => a.length - b.length);

      setSortedGoods(orderLength);
      setSortType('length');
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
            { 'is-light': sortType !== 'alphabetical' },
          )}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames(
              'button',
              'is-success',
              { 'is-light': sortType !== 'length' },
            )}
          onClick={sortByLength}

        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames(
              'button',
              'is-warning',
              { 'is-light': isReversed === false },
            )}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {sortedGoods.join('') !== goodsFromServer.join('') && (
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
