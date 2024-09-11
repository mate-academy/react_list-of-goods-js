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
  const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);
  const [isSortedByLength, setIsSortedByLength] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = goods => goods.sort((a, b) => a.localeCompare(b));

  const sortByLength = goods => goods.sort((a, b) => a.length - b.length);

  const reverseOrder = goods => goods.reverse();

  const reset = () => {
    setIsSortedAlphabetically(false);
    setIsSortedByLength(false);
    setIsReversed(false);
  };

  const isResetVisible =
    isSortedAlphabetically || isSortedByLength || isReversed;

  const getVisibleGoods = () => {
    let visibleGoods = [...goodsFromServer];

    if (isSortedAlphabetically) {
      visibleGoods = sortAlphabetically(visibleGoods);
    }

    if (isSortedByLength) {
      visibleGoods = sortByLength(visibleGoods);
    }

    if (isReversed) {
      visibleGoods = reverseOrder(visibleGoods);
    }

    return visibleGoods;
  };

  const handleSortByLengthClick = () => {
    setIsSortedByLength(true);
    setIsSortedAlphabetically(false);
  };

  const handleSortAlphabetically = () => {
    setIsSortedByLength(false);
    setIsSortedAlphabetically(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isSortedAlphabetically ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isSortedByLength ? '' : 'is-light'}`}
          onClick={handleSortByLengthClick}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {getVisibleGoods().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
