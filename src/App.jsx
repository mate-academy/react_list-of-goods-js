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

const SortType = {
  ASC: 'ASC',
  LENGTH: 'LENGTH',
};

const sortOptions = [
  {
    type: SortType.ASC,
    title: 'Sort alphabetically',
    cssClass: 'is-info',
  },
  {
    type: SortType.LENGTH,
    title: 'Sort by length',
    cssClass: 'is-success',
  },
];

const getPreparedGoods = (goods, { sortBy, isReversed }) => {
  const preparedGoods = [...goods];

  preparedGoods.sort((a, b) => {
    switch (sortBy) {
      case SortType.ASC:
        return a.localeCompare(b);
      case SortType.LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState();
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortBy,
    isReversed,
  });

  const toggleReverse = () => {
    setIsReversed(!isReversed);
  };

  const resetSorting = () => {
    setSortBy(null);
    setIsReversed(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {sortOptions.map(sort => (
          <button
            type="button"
            className={cn('button', sort.cssClass, {
              'is-light': sortBy !== sort.type,
            })}
            onClick={() => setSortBy(sort.type)}
          >
            {sort.title}
          </button>
        ))}

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={toggleReverse}
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
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
