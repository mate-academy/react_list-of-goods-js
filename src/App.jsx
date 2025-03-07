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

export const App = () => {
  const [sortedGoods, setSortGoods] = useState(goodsFromServer);
  const [currentSort, setCurrentSort] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const getPreparedGoods = sortFunction => {
    const sorted = [...goodsFromServer].sort(sortFunction);

    return isReversed ? [...sorted].reverse() : sorted;
  };

  const sortByAlphabettycally = () => {
    setSortGoods(getPreparedGoods((a, b) => a.localeCompare(b)));
    setCurrentSort('alphabet');
  };

  const sortByLength = () => {
    setSortGoods(getPreparedGoods((a, b) => a.length - b.length));
    setCurrentSort('length');
  };

  const sortByReverse = () => {
    const reversed = [...sortedGoods].reverse();

    setSortGoods(reversed);
    setIsReversed(!isReversed);
  };

  const sortClean = () => {
    setSortGoods(goodsFromServer);
    setIsReversed(false);
    setCurrentSort(null);
  };

  const isResetVisible = currentSort !== null || isReversed;

  return (
    <div className="section content has-background-white">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info
            ${currentSort === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortByAlphabettycally}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success
            ${currentSort === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning
            ${isReversed ? '' : 'is-light'}`}
          onClick={sortByReverse}
        >
          Reverse
        </button>
        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={sortClean}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good" className="has-text-link	">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
