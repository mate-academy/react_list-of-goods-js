import { useState } from 'react';

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
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const goods = [...goodsFromServer];

  if (sortType === 'abc') {
    goods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === 'length') {
    goods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    goods.reverse();
  }

  const sortByAbc = () => {
    setSortType('abc');
  };

  const sortByLength = () => {
    setSortType('length');
  };

  const reverse = () => {
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-success ${
            sortType === 'abc' ? undefined : 'is-light'
          }`}
          onClick={sortByAbc}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === 'length' ? undefined : 'is-light'
          }`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-success ${isReversed ? undefined : 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
