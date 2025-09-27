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
  const [isSortByLength, setIsSortByLength] = useState(false);
  const [isSortByAlphabetically, setIsSortByAlphabetically] = useState(false);

  const sortAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
    const finalGoods = isReversed ? sorted.reverse() : sorted;

    setGoods(finalGoods);
    setIsSortByLength(false);
    setIsSortByAlphabetically(true);
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);
    const finalGoods = isReversed ? sorted.reverse() : sorted;

    setGoods(finalGoods);
    setIsSortByLength(true);
    setIsSortByAlphabetically(false);
  };

  const reverse = () => {
    if (isSortByAlphabetically) {
      const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
      const finalGoods = isReversed ? sorted : sorted.reverse();

      setGoods(finalGoods);
    } else if (isSortByLength) {
      const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);
      const finalGoods = isReversed ? sorted : sorted.reverse();

      setGoods(finalGoods);
    } else {
      const finalGoods = isReversed
        ? goodsFromServer
        : [...goodsFromServer].reverse();

      setGoods(finalGoods);
    }

    setIsReversed(!isReversed);
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setIsReversed(false);
    setIsSortByLength(false);
    setIsSortByAlphabetically(false);
  };

  const isOriginalOrder =
    JSON.stringify(goods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isSortByAlphabetically ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isSortByLength ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
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
