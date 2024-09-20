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
  const [sortType, setSortType] = useState('');
  const [reversed, setReversed] = useState('');

  function getSortedList(goods, sortBy, isReverse) {
    const sortedList = [...goods].sort((good1, good2) => {
      switch (sortBy) {
        case 'alpha':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    });

    return isReverse ? sortedList.reverse() : sortedList;
  }

  const reset = () => {
    setReversed('');
    setSortType('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType('alpha')}
          type="button"
          className={
            sortType !== 'alpha' ? 'button is-info is-light' : 'button is-info'
          }
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortType('length')}
          type="button"
          className={
            sortType !== 'length'
              ? 'button is-success is-light'
              : 'button is-info'
          }
        >
          Sort by length
        </button>
        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={
            !reversed ? 'button is-warning is-light' : 'button is-warning'
          }
        >
          Reverse
        </button>
        {sortType.length || reversed ? (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {getSortedList(goodsFromServer, sortType, reversed).map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
