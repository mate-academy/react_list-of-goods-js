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

const SORT_BY_ABC = 'abc';
const SORT_BY_LENGTH = 'length';

const sort = (arr, sortType, isRevers) => {
  const goodsCopy = [...arr];

  if (sortType) {
    switch (sortType) {
      case SORT_BY_ABC:
        goodsCopy.sort();
        break;
      case SORT_BY_LENGTH:
        goodsCopy.sort((a, b) => a.length - b.length);
        break;
      default: return 'unknown sort type';
    }
  }

  if (isRevers) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};

export const App = () => {
  const [currentSort, setSort] = useState(null);
  const [revers, setReverse] = useState(false);

  const goods = sort(goodsFromServer, currentSort, revers);

  function reset() {
    setSort(null);
    setReverse(false);

    return true;
  }

  function handleRevers() {
    setReverse(!revers);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSort(SORT_BY_ABC)}
          type="button"
          className={cn(
            'button', 'is-info', { 'is-light': currentSort !== SORT_BY_ABC },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSort(SORT_BY_LENGTH)}
          type="button"
          className={cn(
            'button', 'is-success',
            { 'is-light': currentSort !== SORT_BY_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={handleRevers}
          type="button"
          className={cn(
            'button', 'is-warning',
            { 'is-light': !revers },
          )}
        >
          Reverse
        </button>

        {(revers !== false || currentSort !== null) ? (
          <button
            onClick={() => reset()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null
        }
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
