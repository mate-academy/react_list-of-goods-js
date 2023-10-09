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
    isSortRevers = false },
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

  return isSortRevers ? preparedGoods.reverse() : preparedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isSortRevers, setIsSortRevers] = useState(false);
  const handlerSortByAlphabet = () => {
    setSortBy(sortBy === SORT_BY_ALPHABET
      ? ''
      : SORT_BY_ALPHABET);
  };

  const handlerSortByLength = () => {
    setSortBy(sortBy === SORT_BY_LENGTH
      ? ''
      : SORT_BY_LENGTH);
  };

  const handlerSortRevers = () => {
    setIsSortRevers(isSortRevers === false);
  };

  const handlerSortReset = () => {
    setSortBy('');
    setIsSortRevers(false);
  };

  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortBy, isSortRevers });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info
          ${sortBy !== SORT_BY_ALPHABET && 'is-light'}`}
          onClick={handlerSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success
          ${sortBy !== SORT_BY_LENGTH && 'is-light'}`}
          onClick={handlerSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning
          ${isSortRevers === false && 'is-light'}`}
          onClick={handlerSortRevers}
        >
          Reverse
        </button>

        {(sortBy !== '' || isSortRevers === true)
          && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handlerSortReset}
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
