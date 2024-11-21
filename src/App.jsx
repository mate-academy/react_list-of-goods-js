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

const SORT_BY_ALPHABET = 'alphabetSort';
const SORT_BY_LENGTH = 'goodsLength';

function sortGoods(goods, { sortField, isReversed }) {
  const newSortGoogs = [...goods];

  if (sortField === SORT_BY_ALPHABET) {
    newSortGoogs.sort((a, b) => a.localeCompare(b));
  } else if (sortField === SORT_BY_LENGTH) {
    newSortGoogs.sort((a, b) => a.length - b.length);
  }

  return isReversed ? newSortGoogs.reverse() : newSortGoogs;
}

export const App = () => {
  const [sortField, setSortField] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const reset = () => {
    setSortField(null);
    setIsReversed(false);
  };

  const listGoods = sortGoods(goodsFromServer, { sortField, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(isReversed || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {listGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
