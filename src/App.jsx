import { useState } from 'react';
import cn from 'classnames';

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
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [activeButton, setActiveButton] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const sorted = [...visibleGoods];

  const sortAlph = () => {
    if (isReversed) {
      sorted.sort((a, b) => b.localeCompare(a));
    } else {
      sorted.sort((a, b) => a.localeCompare(b));
    }

    setVisibleGoods(sorted);
    setActiveButton('Sort alphabetically');
  };

  const sortLength = () => {
    if (isReversed) {
      sorted.sort((a, b) => b.length - a.length);
    } else {
      sorted.sort((a, b) => a.length - b.length);
    }

    setVisibleGoods(sorted);
    setActiveButton('Sort by length');
  };

  const reverse = () => {
    const reversed = [...visibleGoods].reverse();

    setVisibleGoods(reversed);
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setActiveButton(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlph}
          type="button"
          className={cn('button is-info', {
            'is-light': activeButton !== 'Sort alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortLength}
          type="button"
          className={cn('button is-success', {
            'is-light': activeButton !== 'Sort by length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(activeButton || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
