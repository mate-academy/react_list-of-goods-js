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

  const isOriginalOrder = () => {
    return JSON.stringify(goods) === JSON.stringify(goodsFromServer);
  };

  const sortAlphabetically = () => {
    const sorted = [...goods].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? sorted.reverse() : sorted);
    setActiveSort('alphabetically');
  };

  const sortByLength = () => {
    const sorted = [...goods].sort((a, b) => {
      const lengthDiff = a.length - b.length;

      if (lengthDiff === 0) {
        return a.localeCompare(b);
      }

      return lengthDiff;
    });

    setGoods(isReversed ? sorted.reverse() : sorted);
    setActiveSort('length');
  };

  const reverse = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setActiveSort(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort !== 'alphabetically' ? 'is-light' : ''}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort !== 'length' ? 'is-light' : ''}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {!isOriginalOrder() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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

export default App;
