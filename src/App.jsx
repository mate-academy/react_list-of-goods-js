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
const [goods,setGoods] = useState(goodsFromServer);
const [isAlphabetical, setIsAlphabetical] = useState(false);
const [isByLength,setIsByLength] = useState(false);
const [isReversed,setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    const sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));

    setGoods(sortedGoods);
    setIsAlphabetical(true);
    setIsByLength(false);
    setIsReversed(false);
  };

  const sortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sortedGoods);
    setIsByLength(true);
    setIsAlphabetical(false);
    setIsReversed(false);
  };

  const reverseOrder = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const resetOrder = () => {
    setGoods(goodsFromServer);
    setIsAlphabetical(false);
    setIsByLength(false);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isAlphabetical ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isByLength ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger ${goods !== goodsFromServer ? '' : 'is-light'}`}
          onClick={resetOrder}
          disabled={goods === goodsFromServer}
        >
          Reset
        </button>
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
