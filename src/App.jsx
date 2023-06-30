import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';
import { SortGoods } from './components/SortGoods/SortGoods';

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

const SORT_FIELD_AZ = 'az';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';
const SORT_FIELD_RESET = '';

function getSortedGoods(goods, type) {
  const sortedGoods = [...goods];

  if (type[0] === SORT_FIELD_AZ) {
    sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (type[0] === SORT_FIELD_LENGTH) {
    sortedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (type[1] === SORT_FIELD_REVERSE) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(['', '']);
  const sortedGoods = getSortedGoods(goodsFromServer, sortType);

  const isReset = sortType[0] !== SORT_FIELD_RESET
    || sortType[1] !== SORT_FIELD_RESET;

  const isReverse = sortType[1] === SORT_FIELD_REVERSE
    ? [sortType[0], SORT_FIELD_RESET]
    : [sortType[0], SORT_FIELD_REVERSE];

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button is-info', { 'is-light': sortType[0] !== SORT_FIELD_AZ })
          }
          onClick={() => setSortType([SORT_FIELD_AZ, sortType[1]])}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button is-success',
              { 'is-light': sortType[0] !== SORT_FIELD_LENGTH })
          }
          onClick={() => setSortType([SORT_FIELD_LENGTH, sortType[1]])}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button is-warning',
              { 'is-light': sortType[1] !== SORT_FIELD_REVERSE })
          }
          onClick={() => setSortType(isReverse)}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortType(['', ''])}
          >
            Reset
          </button>
        )}
      </div>

      <SortGoods goods={sortedGoods} />
    </div>
  );
};
