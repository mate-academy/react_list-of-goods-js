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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'alphabet';

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const preparedGoods = [...goodsFromServer];
  const [isReversed, setIsReversed] = useState(false);

  const handleSortByAphabet = () => setSortType(SORT_BY_ALPHABET);
  const handleSortByLength = () => setSortType(SORT_BY_LENGTH);
  const handleReverse = () =>  setIsReversed(prev => !prev);
  const handleReset = () => {
    setSortType(null);
    setIsReversed(false);
  }

  if (sortType === SORT_BY_ALPHABET) {
    preparedGoods.sort((goods1, good2) => goods1.localeCompare(good2));
  }

  if (sortType === SORT_BY_LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SORT_BY_ALPHABET ? '' : 'is-light'}`}
          onClick={handleSortByAphabet}
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

        {sortType || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {preparedGoods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
