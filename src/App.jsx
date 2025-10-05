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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, sortType, isReversed) {
  const preparedGoods = [...goods];

  switch (sortType) {
    case SORT_BY_ALPHABET:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT_BY_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    case '':
    default:
      break;
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortState, setSortState] = useState({
    sortType: '',
    isReversed: false,
  });

  const { sortType, isReversed } = sortState;

  const isSorted = sortType !== '' || isReversed;

  const handleSortByAlphabet = () => {
    setSortState({
      sortType: SORT_BY_ALPHABET,
      isReversed: false,
    });
  };

  const handleSortByLength = () => {
    setSortState({
      sortType: SORT_BY_LENGTH,
      isReversed: false,
    });
  };

  const handleReverse = () => {
    setSortState(prevState => ({
      ...prevState,
      isReversed: !prevState.isReversed,
    }));
  };

  const handleReset = () => {
    setSortState({
      sortType: '',
      isReversed: false,
    });
  };

  const goodsForWork = getPreparedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SORT_BY_ALPHABET ? '' : 'is-light'}`}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsForWork.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
