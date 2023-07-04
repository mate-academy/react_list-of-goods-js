import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

function filterGoods(sortBy) {
  const copy = [...goodsFromServer];

  switch (sortBy) {
    case SORT_BY_ALPHABET:
      return copy.sort((good1, good2) => good1.localeCompare(good2));

    case SORT_BY_LENGTH:
      return copy.sort((good1, good2) => good1.length - good2.length);

    default:
      return copy;
  }
}

const SORT_BY_ALPHABET = 'sortByAlphabet';
const SORT_BY_LENGTH = 'sortByLength';

export const App = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const preparedGoods = filterGoods(sortBy);

  const resetSorting = () => {
    setIsReversed(false);
    setSortBy('');
  };

  if (isReversed) {
    preparedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', ['is-info'], {
            'is-light': sortBy !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortBy(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', ['is-success'], {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', ['is-warning'], {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
