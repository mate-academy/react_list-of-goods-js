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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(
  goods,
  { sortBy = SORT_BY_ALPHABET,
    isSortReversed = false },
) {
  let preparedGoods = [...goods];

  switch (sortBy) {
    case SORT_BY_ALPHABET:
      preparedGoods = preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_BY_LENGTH:
      preparedGoods = preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  return isSortReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isSortReversed, setIsSortReversed] = useState(false);
  const handleSortByAlphabet = () => {
    setSortBy(sortBy === SORT_BY_ALPHABET
      ? ''
      : SORT_BY_ALPHABET);
  };

  const handleSortByLength = () => {
    setSortBy(sortBy === SORT_BY_LENGTH
      ? ''
      : SORT_BY_LENGTH);
  };

  const handleSortReversed = () => {
    setIsSortReversed((prev = isSortReversed) => !prev);
  };

  const handleSortReset = () => {
    setSortBy('');
    setIsSortReversed(false);
  };

  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortBy, isSortReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info
          ${sortBy !== SORT_BY_ALPHABET && 'is-light'}`}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success
          ${sortBy !== SORT_BY_LENGTH && 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning
          ${isSortReversed === false && 'is-light'}`}
          onClick={handleSortReversed}
        >
          Reverse
        </button>

        {(sortBy || isSortReversed)
          && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleSortReset}
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
