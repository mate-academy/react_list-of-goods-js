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
  const [isAlphabetical, setIsAlphabetical] = useState(false);
  const [isByLength, setIsByLength] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    const newGoods = sortedGoods.sort();

    setSortedGoods(isReversed ? newGoods.reverse() : newGoods);
    setIsAlphabetical(true);
    setIsByLength(false);
  };

  const sortByLength = () => {
    const newGoods = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setSortedGoods(isReversed ? newGoods.reverse() : newGoods);
    setIsAlphabetical(false);
    setIsByLength(true);
  };

  const reverseGoods = () => {
    const reversedGoods = sortedGoods.reverse();

    setSortedGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const resetSorting = () => {
    setSortedGoods([...goodsFromServer]);
    setIsAlphabetical(false);
    setIsByLength(false);
    setIsReversed(false);
  };

  const shouldShowResetButton = !(
    JSON.stringify(sortedGoods) === JSON.stringify(goodsFromServer)
  );

  const resetButtonClass = classNames(
    'button',
    'is-danger', {
      'is-light': isAlphabetical
      || isByLength
      || isReversed,
    },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info', {
              'is-light': !isAlphabetical,
            },
          )}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success', {
              'is-light': !isByLength,
            },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning', {
              'is-light': !isReversed,
            },
          )}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {shouldShowResetButton && (
          <button
            type="button"
            className={resetButtonClass}
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
