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
  const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);
  const [isSortedByLength, setIsSortedByLength] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isResetVisible, setIsResetVisible] = useState(false);

  const sortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    setGoods(sortedGoods);
    setIsSortedAlphabetically(true);
    setIsSortedByLength(false);
    setIsReversed(false);
    setIsResetVisible(true);
  };

  const sortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sortedGoods);
    setIsSortedAlphabetically(false);
    setIsSortedByLength(true);
    setIsReversed(false);
    setIsResetVisible(true);
  };

  const reverseGoods = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
    setIsResetVisible(true);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setIsSortedAlphabetically(false);
    setIsSortedByLength(false);
    setIsReversed(false);
    setIsResetVisible(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isSortedAlphabetically ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isSortedByLength ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
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
