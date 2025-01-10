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

const SORT_BY_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

function sortGoods(goodsForSort, { sortBy, reversed }) {
  const visibleGoods = [...goodsForSort];

  if (!goodsFromServer) {
    return 0;
  }

  if (sortBy) {
    switch (sortBy) {
      case SORT_BY_ALPHABETICALLY:
        visibleGoods.sort((value1, value2) => value1.localeCompare(value2));
        break;
      case SORT_BY_LENGTH:
        visibleGoods.sort((value1, value2) => value1.length - value2.length);
        break;
      default:
        break;
    }
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortedBy, setSortedBy] = useState('');
  const visibleGoods = sortGoods(goodsFromServer, {
    sortBy: sortedBy,
    reversed: isReverse,
  });

  function reset() {
    setIsReverse(false);
    setSortedBy('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedBy === SORT_BY_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => setSortedBy(SORT_BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedBy === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortedBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverse ? '' : 'is-light'}`}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {sortedBy || isReverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : null}
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
