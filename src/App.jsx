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

const generateKey = () => {
  return `_${Math.random().toString(36).substr(2, 9)}`;
};

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);
  const [isSortedByLength, setIsSortedByLength] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  const sortAlphabetically = () => {
    setGoods([...goods].sort());
    setIsSortedAlphabetically(true);
    setIsSortedByLength(false);
    setIsReversed(false);
    setHasChanged(true);
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
    setIsSortedAlphabetically(false);
    setIsSortedByLength(true);
    setIsReversed(false);
    setHasChanged(true);
  };

  const reverseOrder = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
    setIsSortedAlphabetically(false);
    setIsSortedByLength(false);
    setHasChanged(true);
  };

  const resetOrder = () => {
    setGoods([...goodsFromServer]);
    setIsSortedAlphabetically(false);
    setIsSortedByLength(false);
    setIsReversed(false);
    setHasChanged(false);
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
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {hasChanged && (
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
        {goods.map(good => (
          <li key={generateKey()} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
