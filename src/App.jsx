import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useMemo } from 'react';

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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, toggleReverse }) {
  const comparators = {
    [SORT_ALPHABET]: (a, b) => a.localeCompare(b),
    [SORT_LENGTH]: (a, b) => a.length - b.length,
  };

  const comparator = comparators[sortField] || (() => 0);
  const prepared = sortField ? [...goods].sort(comparator) : [...goods];

  return toggleReverse ? prepared.reverse() : prepared;
}

function arraysEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [toggleReverse, setReverse] = useState(false);

  const visibleGoods = useMemo(
    () => getPreparedGoods(goodsFromServer, { sortField, toggleReverse }),
    [sortField, toggleReverse],
  );

  const isOriginalOrder = useMemo(
    () => arraysEqual(visibleGoods, goodsFromServer),
    [visibleGoods],
  );

  function handleSortAlphabetically() {
    setSortField(SORT_ALPHABET);
  }

  function handleSortByLength() {
    setSortField(SORT_LENGTH);
  }

  function handleToggleReverse() {
    setReverse(prev => !prev);
  }

  function handleReset() {
    setSortField('');
    setReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_ALPHABET ? 'is-light' : ''}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_LENGTH ? 'is-light' : ''}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!toggleReverse ? 'is-light' : ''}`}
          onClick={handleToggleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
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
