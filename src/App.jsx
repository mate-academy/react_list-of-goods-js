import { useState } from 'react';
import { clsx } from 'clsx';
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
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  let sortedGoods = [...goodsFromServer];

  if (sortBy === 'alphabet') {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortBy === 'length') {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSortBy('alphabet');
          }}
          className={clsx('button is-info', {
            'is-light': sortBy !== 'alphabet',
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            setSortBy('length');
          }}
          className={clsx('button is-success', {
            'is-light': sortBy !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            setIsReversed(!isReversed);
          }}
          className={clsx('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortBy !== '' || isReversed) && (
          <button
            type="button"
            onClick={() => {
              setSortBy('');
              setIsReversed(false);
            }}
            className="button is-danger is-light"
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
