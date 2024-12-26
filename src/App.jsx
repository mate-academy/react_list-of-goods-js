/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

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

const getSortedGoods = (goods, sortBy, isReversed) => {
  const sortedGoods = [...goods];

  if (sortBy === SORT_FIELD_ALPHABET) {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === SORT_FIELD_LENGTH) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(goodsFromServer, sortBy, isReversed);

  const reset = () => {
    setSortBy('');
    setIsReversed(false);
  };

  const toggleReverse = () => {
    setIsReversed(prevState => !prevState);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === SORT_FIELD_ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortBy(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortBy(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button type="button" className="button is-danger" onClick={reset}>
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
