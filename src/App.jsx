import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

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
  const [visible, setVisible] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);

  // Точные проверки текущего состояния массива
  const isAlphabetical =
    [...visible].join(',') ===
      [...goodsFromServer].sort((a, b) => a.localeCompare(b)).join(',') ||
    [...visible].join(',') ===
      [...goodsFromServer]
        .sort((a, b) => a.localeCompare(b))
        .reverse()
        .join(',');

  const isByLength =
    [...visible].join(',') ===
      [...goodsFromServer].sort((a, b) => a.length - b.length).join(',') ||
    [...visible].join(',') ===
      [...goodsFromServer]
        .sort((a, b) => a.length - b.length)
        .reverse()
        .join(',');

  const isInitial =
    visible.join(',') === goodsFromServer.join(',') && !isReversed;

  const sortAlphabetically = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    if (isReversed) {
      sorted.reverse();
    }

    setVisible(sorted);
  };

  const sortByLength = () => {
    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    if (isReversed) {
      sorted.reverse();
    }

    setVisible(sorted);
  };

  const reverseGoods = () => {
    setIsReversed(!isReversed);
    setVisible([...visible].reverse());
  };

  const resetGoods = () => {
    setVisible(goodsFromServer);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isAlphabetical && !isInitial ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isByLength && !isInitial ? '' : 'is-light'}`}
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

        {!isInitial && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visible.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
