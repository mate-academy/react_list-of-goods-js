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

const SORT_BY_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

function sortArr(arr, { sortBy, isReversed }) {
  const result = [...arr];

  if (sortBy) {
    result.sort((item1, item2) => {
      switch (sortBy) {
        case SORT_BY_ALPHABETICALLY:
          return item1.localeCompare(item2);

        case SORT_BY_LENGTH:
          return item1.length - item2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return result.reverse();
  }

  return result;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = sortArr(goodsFromServer, {
    sortBy,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SORT_BY_ALPHABETICALLY,
          })}
          onClick={() => setSortBy(SORT_BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortBy(SORT_BY_LENGTH)}
          className={cn('button is-success', {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {sortBy !== '' && !isReversed && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortBy('')}
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
