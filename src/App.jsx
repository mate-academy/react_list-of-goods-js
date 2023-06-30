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

const SORT_ALPHABETICALLY = 'Alphabet';
const SORT_BY_LENGTH = 'Length';
const SORT_REVERSE = false;

function getPreparedGoods(goods, { sortType, reverse }) {
  const preparedGoods = [...goodsFromServer];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return reverse ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reverse, setReverse] = useState(SORT_REVERSE);
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortType, reverse });
  const isAlphabetSorted = sortType === SORT_ALPHABETICALLY;
  const isLengthSorted = sortType === SORT_BY_LENGTH;
  const isOriginalOrder = !sortType && !reverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${isAlphabetSorted ? 'is-info' : 'is-info is-light'}`}
          onClick={() => setSortType(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${isLengthSorted ? 'is-success' : 'is-success is-light'}`}
          onClick={() => setSortType(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${reverse ? 'is-warning' : 'is-warning is-light'}`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {isOriginalOrder || (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(SORT_REVERSE);
              setSortType('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
