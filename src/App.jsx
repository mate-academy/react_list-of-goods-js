import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_TYPES = {
  ALPHABET: 'alphabet',
  LENGTH: 'length',
};

const initialSortState = {
  sortType: null,
  isReversed: false,
};

export const App = () => {
  const [sortState, setSortState] = useState(initialSortState);

  const reset = () => {
    setSortState(initialSortState);
  };

  const toggleSortType = newSortType => {
    setSortState(prevState => ({
      ...prevState,
      sortType: prevState.sortType === newSortType ? null : newSortType,
    }));
  };

  const toggleReverse = () => {
    setSortState(prevState => ({
      ...prevState,
      isReversed: !prevState.isReversed,
    }));
  };

  const sortFunction = (a, b) => {
    switch (sortState.sortType) {
      case SORT_TYPES.ALPHABET:
        return a.localeCompare(b);
      case SORT_TYPES.LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  };

  const sortedGoods = [...goodsFromServer].sort(sortFunction);

  if (sortState.isReversed) sortedGoods.reverse();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => toggleSortType(SORT_TYPES.ALPHABET)}
          type="button"
          className={classNames('button is-info', {
            'is-light': sortState.sortType !== SORT_TYPES.ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => toggleSortType(SORT_TYPES.LENGTH)}
          type="button"
          className={classNames('button is-success', {
            'is-light': sortState.sortType !== SORT_TYPES.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={toggleReverse}
          type="button"
          className={classNames('button is-warning', {
            'is-light': !sortState.isReversed,
          })}
        >
          Reverse
        </button>

        {(sortState.sortType || sortState.isReversed) && (
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
        {sortedGoods.map((good, index) => (
          <li key={`${good}${index + 1}`} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
