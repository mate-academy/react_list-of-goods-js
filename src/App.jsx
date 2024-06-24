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

const SORT_METHODS = {
  alphabetically: 'alphabetically',
  length: 'length',
};

const getSortedGoods = (goods, sort) => {
  const sortedGoods = goods.sort((good1, good2) => {
    switch (sort) {
      case SORT_METHODS.alphabetically:
        return good1.localeCompare(good2);

      case SORT_METHODS.length:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  return sortedGoods;
};

const getPreparedGoods = (goods, { sort, reversed }) => {
  let preparedGoods = [...goods];

  if (sort) {
    preparedGoods = getSortedGoods(preparedGoods, sort);
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortMethod, setSortMethod] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const isResetShown = sortMethod || isReversed;

  const goods = getPreparedGoods(goodsFromServer, {
    sort: sortMethod,
    reversed: isReversed,
  });

  const onSort = method => {
    setSortMethod(method);
  };

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const onReset = () => {
    setSortMethod(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortMethod !== SORT_METHODS.alphabetically,
          })}
          onClick={() => onSort(SORT_METHODS.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortMethod !== SORT_METHODS.length,
          })}
          onClick={() => onSort(SORT_METHODS.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isResetShown && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={onReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
