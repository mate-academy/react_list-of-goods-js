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
  const [isReversed, setIsReversed] = useState(false);
  const [sortValue, setSortValue] = useState('');

  function getSortedList(array, sortBy, isReverse) {
    const sortedArray = [...array].sort((a, b) => {
      switch (sortBy) {
        case 'ALPHA':
          return a.localeCompare(b);
        case 'LENGTH':
          return a.length - b.length;
        default:
          return 0;
      }
    });

    const listForRender = list =>
      list.map((good, index) => ({ id: index, product: good }));

    return isReverse
      ? listForRender(sortedArray.reverse())
      : listForRender(sortedArray);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortValue('ALPHA')}
          type="button"
          className={
            sortValue !== 'ALPHA' ? 'button is-info is-light' : 'button is-info'
          }
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => setSortValue('LENGTH')}
          type="button"
          className={
            sortValue !== 'LENGTH'
              ? 'button is-success is-light'
              : 'button is-info'
          }
        >
          Sort by length
        </button>
        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={
            !isReversed ? 'button is-warning is-light' : 'button is-warning'
          }
        >
          Reverse
        </button>
        {sortValue.length || isReversed ? (
          <button
            onClick={() => {
              setIsReversed(false);
              setSortValue('');
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {getSortedList(goodsFromServer, sortValue, isReversed).map(good => (
          <li key={good.id} data-cy="Good">
            {good.product}
          </li>
        ))}
      </ul>
    </div>
  );
};
