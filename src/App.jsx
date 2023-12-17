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
  const [isReversed, setIsReversed] = useState(false);
  const [resetVisible, setResetVisible] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const handleSortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setIsReversed(false);
    setResetVisible(true);
    setActiveButton('alphabetical');
  };

  const handleSortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    setGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setIsReversed(false);
    setResetVisible(true);
    setActiveButton('length');
  };

  const handleReverse = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
    setResetVisible(goods.join('') !== goodsFromServer.join(''));
    setActiveButton('reverse');
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setIsReversed(false);
    setResetVisible(false);
    setActiveButton(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === 'alphabetical' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === 'length' ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeButton === 'reverse' ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {resetVisible && (
          <button
            type="button"
            className={`button is-danger ${activeButton === null ? '' : 'is-light'}`}
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
