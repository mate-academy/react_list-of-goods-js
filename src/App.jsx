import React, { useState } from 'react';
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
  const [goods, setGoods] = useState(goodsFromServer);
  const [activeSort, setActiveSort] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const applyReverseIfNeeded = (array) =>
    isReversed ? [...array].reverse() : array;

  const handleSortAlphabetically = () => {
    let sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
    sorted = applyReverseIfNeeded(sorted);
    setGoods(sorted);
    setActiveSort('alpha');
  };

  const handleSortByLength = () => {
    let sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);
    sorted = applyReverseIfNeeded(sorted);
    setGoods(sorted);
    setActiveSort('length');
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
    setGoods(prevGoods => [...prevGoods].reverse());
  };

  const handleReset = () => {
    setIsReversed(false);
    setActiveSort(null);
    setGoods(goodsFromServer);
  };

  const isInitialOrder =
    !isReversed &&
    activeSort === null &&
    goods.every((good, index) => good === goodsFromServer[index]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            activeSort === 'alpha' ? '' : 'is-light'
          }`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            activeSort === 'length' ? '' : 'is-light'
          }`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isInitialOrder && (
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
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
