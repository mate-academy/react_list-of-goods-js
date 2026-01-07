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

const SET_ALPHABET_SORT = 'alphabet';
const SET_LENGTH_SORT = 'length';

function getSortedGoods(query, isReversedState) {
  const sortedGoods = [...goodsFromServer];

  if (query) {
    sortedGoods.sort((good1, good2) => {
      switch (query) {
        case SET_ALPHABET_SORT:
          return good1.localeCompare(good2);

        case SET_LENGTH_SORT:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversedState) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortState, setSortState] = useState('');
  const [reversedState, setReversedState] = useState(false);

  const preparedGoods = getSortedGoods(sortState, reversedState);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortState === SET_ALPHABET_SORT ? 'is-selected' : 'is-light'}`}
          onClick={() => setSortState(SET_ALPHABET_SORT)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortState === SET_LENGTH_SORT ? 'is-selected' : 'is-light'}`}
          onClick={() => setSortState(SET_LENGTH_SORT)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversedState ? 'is-selected' : 'is-light'}`}
          onClick={() => setReversedState(!reversedState)}
        >
          Reverse
        </button>

        {(sortState || reversedState) && (
          <button
            type="button"
            className={`button is-danger is-light`}
            onClick={() => {
              setSortState('');
              setReversedState(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
