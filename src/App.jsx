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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

function getSortValue(values, { sortValue, isReversed }) {
  const value = [...values];

  value.sort((value1, value2) => {
    switch (sortValue) {
      case SORT_BY_NAME:
        return value1.localeCompare(value2);

      case SORT_BY_LENGTH:
        return value1.length - value2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    value.reverse();
  }

  return value;
}

export const App = () => {
  const [sortValue, setSortValue] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const storegGoods = getSortValue(goodsFromServer, { sortValue, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortValue === SORT_BY_NAME ? '' : 'is-light'}`}
          onClick={() => setSortValue(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortValue === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortValue(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortValue !== null || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortValue(null);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {storegGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
