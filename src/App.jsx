import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

const ALPHABETICAL_SORT = 'alphabetical';
const LENGTH_SORT = 'length';

function getSortedList(goods, { sortOrder, isReversed }) {
  const goodsForSort = [...goods];

  if (sortOrder === LENGTH_SORT) {
    goodsForSort.sort((a, b) => a.length - b.length);
  }

  if (sortOrder === ALPHABETICAL_SORT) {
    goodsForSort.sort((a, b) => a.localeCompare(b));
  }

  if (isReversed) {
    goodsForSort.reverse();
  }

  return goodsForSort;
}

export const App = () => {
  const [sortOrder, setSortOrder] = useState('');
  const [isReversed, setIsReversed] = useState('');
  const sortGoodsList = getSortedList(
    goodsFromServer, { sortOrder, isReversed },
  );

  const switchRevers = () => setIsReversed(prevValue => !prevValue);

  const reset = () => {
    setIsReversed(false);
    setSortOrder('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === ALPHABETICAL_SORT ? '' : 'is-light'}`}
          onClick={() => (
            setSortOrder(ALPHABETICAL_SORT)
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === LENGTH_SORT ? '' : 'is-light'}`}
          onClick={() => (
            setSortOrder(LENGTH_SORT)
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={switchRevers}
        >
          Reverse
        </button>

        {(isReversed || sortOrder) && (
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
        {sortGoodsList.map(goodsItem => (
          <li key={goodsItem} data-cy="Good">
            {goodsItem}
          </li>
        ))}
      </ul>
    </div>
  );
};
