import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import cn from 'classnames';

import { GoodList } from './components/GoodList';

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

const ALPHABETICALL_SORT_KEY = 'alpha';
const LENGTH_SORT_KEY = 'length';

function sortArray(array, key, descOrder) {
  return array.sort((firstVal, secondVal) => {
    switch (key) {
      case ALPHABETICALL_SORT_KEY:
        return descOrder
          ? secondVal.localeCompare(firstVal)
          : firstVal.localeCompare(secondVal);

      case LENGTH_SORT_KEY: {
        const difference = firstVal.length - secondVal.length;

        if (difference >= 0) {
          return descOrder ? -1 : 1;
        }

        return descOrder ? 1 : -1;
      }

      default:
        return descOrder ? -1 : 1;
    }
  });
}

export function App() {
  const [changeSort, setChangeSort] = useState('');
  const [descSortOrder, setDescSortOrder] = useState(false);

  const sortedGoods = sortArray(
    [...goodsFromServer],
    changeSort,
    descSortOrder,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': changeSort !== ALPHABETICALL_SORT_KEY,
          })}
          onClick={() => setChangeSort(ALPHABETICALL_SORT_KEY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': changeSort !== LENGTH_SORT_KEY,
          })}
          onClick={() => setChangeSort(LENGTH_SORT_KEY)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !descSortOrder,
          })}
          onClick={() => setDescSortOrder(!descSortOrder)}
        >
          Reverse
        </button>

        {changeSort !== '' || descSortOrder ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setChangeSort('');
              setDescSortOrder(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <GoodList goodsList={sortedGoods} />
    </div>
  );
}
