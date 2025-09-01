import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_TYPE_ALPHABETICAL_ORDER = 'alphabeticalOrder';
const SORT_TYPE_LENGTH = 'length';

function getPreparedGoods(goods, sortType, isReverse) {
  let preparedGoods = [...goods];

  if (sortType) {
    preparedGoods = preparedGoods.toSorted((a, b) => {
      switch (sortType) {
        case SORT_TYPE_ALPHABETICAL_ORDER:
          return a.localeCompare(b);
        case SORT_TYPE_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [isReverse, setIsReverse] = useState(false);
  const goods = goodsFromServer;
  const visibleGoods = getPreparedGoods(goods, sortType, isReverse);
  const isModified =
    goods.length !== visibleGoods.length ||
    goods.some((item, index) => item !== visibleGoods[index]);

  const handleSortTypeAlphabeticalOrder = () => {
    setSortType(SORT_TYPE_ALPHABETICAL_ORDER);
  };

  const handleSortTypeLength = () => {
    setSortType(SORT_TYPE_LENGTH);
  };

  const handleReverse = () => {
    setIsReverse(prev => !prev);
  };

  const handleReset = () => {
    setIsReverse(false);
    setSortType(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SORT_TYPE_ALPHABETICAL_ORDER,
          })}
          onClick={handleSortTypeAlphabeticalOrder}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SORT_TYPE_LENGTH,
          })}
          onClick={handleSortTypeLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReverse })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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
