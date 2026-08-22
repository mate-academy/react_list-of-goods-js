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
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const SORT_BY_ABC = 'abc';
  const SORT_BY_LENGTH = 'length';

  const toggleReverse = () => {
    setIsReversed(!isReversed);
  };

  const sortByAlphabet = () => setSortBy(SORT_BY_ABC);
  const sortByLength = () => setSortBy(SORT_BY_LENGTH);

  const reset = () => {
    setSortBy('');
    setIsReversed(false);
  };

  const visibleGoods = [...goodsFromServer];

  if (sortBy === SORT_BY_ABC) {
    visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  } else if (sortBy === SORT_BY_LENGTH) {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isChanged = sortBy !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={`button is-info ${sortBy === SORT_BY_ABC ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortBy === SORT_BY_LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={`button is-warning ${isReversed === true ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
