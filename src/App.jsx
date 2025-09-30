import React, { useState } from 'react';
import classNames from 'classnames';
import './App.scss';

const goodsFromServer = [
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
  const [sortBy, setSortBy] = useState(null); 
  const [isReversed, setIsReversed] = useState(false);

  let visibleGoods = [...goodsFromServer];

  switch (sortBy) {
    case 'alpha':
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;

    case 'length':
      visibleGoods.sort(
        (a, b) => (a.length - b.length) || a.localeCompare(b),
      );
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <main className="section container">
      <h1 className="title">React list of goods</h1>

      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== 'alpha',
          })}
          onClick={() => setSortBy('alpha')}
          data-cy="SortByName"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== 'length',
          })}
          onClick={() => setSortBy('length')}
          data-cy="SortByLength"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
          data-cy="Reverse"
        >
          Reverse
        </button>

        {(sortBy !== null || isReversed) && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortBy(null);
              setIsReversed(false);
            }}
            data-cy="Reset"
          >
            Reset
          </button>
        )}
      </div>

      <ul className="content" data-cy="GoodsList">
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </main>
  );
};
