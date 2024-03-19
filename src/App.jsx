import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const SORT_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'byLength';
const EMPTY = '';

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

function sortGoods(goods, sortType) {
  const sortedGoods = [...goods];

  sortedGoods.sort((good1, good2) => {
    switch (sortType.sortedBy) {
      case SORT_ALPHABET:
        return good1.localeCompare(good2);

      case SORT_BY_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (sortType.reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState({
    sortedBy: EMPTY,
    reversed: false,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType.sortedBy === SORT_ALPHABET ? '' : 'is-light'}`}
          onClick={() => {
            setSortType({
              ...sortType,
              sortedBy: SORT_ALPHABET,
            });
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType.sortedBy === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => {
            setSortType({
              ...sortType,
              sortedBy: SORT_BY_LENGTH,
            });
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortType.reversed ? '' : 'is-light'}`}
          onClick={() => {
            setSortType({
              ...sortType,
              reversed: !sortType.reversed,
            });
          }}
        >
          Reverse
        </button>

        {(sortType.reversed || sortType.sortedBy !== EMPTY) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType({
                ...sortType,
                sortedBy: EMPTY,
                reversed: false,
              });
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods(goodsFromServer, sortType).map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
