import { useState } from 'react';
import cn from 'classnames';

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

const filters = {
  idle: 'idle',
  byAlphabet: 'byAlphabet',
  byLength: 'byLength',
};

const initialFilter = {
  active: filters.idle,
  isReversed: false,
};

const getGoodsForRender = ({ active, isReversed }) => {
  const cloneGoodsFromServer = [...goodsFromServer];

  switch (active) {
    case filters.idle:
      break;

    case filters.byAlphabet:
      cloneGoodsFromServer.sort((a, b) => a.localeCompare(b));
      break;

    case filters.byLength:
      cloneGoodsFromServer.sort((a, b) => a.length - b.length);
      break;

    default:
      return new Error('Switch case error!');
  }

  if (isReversed) {
    cloneGoodsFromServer.reverse();
  }

  return cloneGoodsFromServer;
};

export const App = () => {
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const isResetButtonVisible = activeFilter.active !== initialFilter.active
    || activeFilter.isReversed !== initialFilter.isReversed;

  const handleSetSortFilter = (filter) => {
    setActiveFilter({
      ...activeFilter,
      active: filter,
    });
  };

  const goodsForRender = getGoodsForRender(activeFilter);

  const handleToggleReversed = () => {
    setActiveFilter({
      ...activeFilter,
      isReversed: !activeFilter.isReversed,
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': activeFilter.active !== filters.byAlphabet,
          })}
          onClick={() => handleSetSortFilter(filters.byAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': activeFilter.active !== filters.byLength,
          })}
          onClick={() => handleSetSortFilter(filters.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !activeFilter.isReversed,
          })}
          onClick={handleToggleReversed}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setActiveFilter(initialFilter)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsForRender.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
