import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const SORT_BY_ALPHABET = 'alpha';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, sortBy, isReversed) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((a, b) => {
      switch (sortBy) {
        case SORT_BY_ALPHABET:
          return a.localeCompare(b);

        case SORT_BY_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const allGoods = getPreparedGoods(goodsFromServer, sortBy, isReversed);
  const resetSort = () => {
    setSortBy('');
    setIsReversed(false);
  };

  const isReset = sortBy || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortBy !== SORT_BY_ALPHABET },
            )
          }
          onClick={() => setSortBy(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortBy !== SORT_BY_LENGTH },
            )
          }
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': !isReversed },
            )
          }
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {allGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
