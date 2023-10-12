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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABET = 'alphabet';

function getPreparedGoods(goods, sortValue, isReverse) {
  if (sortValue) {
    goods.sort((goodA, goodB) => {
      switch (sortValue) {
        case SORT_BY_LENGTH:
          return goodA.length - goodB.length;

        case SORT_BY_ALPHABET:
          return goodA.localeCompare(goodB);

        default:
          return goods;
      }
    });
  }

  if (isReverse) {
    goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [sortValue, setSortValue] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const sortedGoods = getPreparedGoods(
    [...goodsFromServer], sortValue, isReverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortValue(SORT_BY_ALPHABET);
          }}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortValue !== SORT_BY_ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortValue(SORT_BY_LENGTH);
          }}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortValue !== SORT_BY_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setIsReverse(!isReverse);
          }}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReverse })}
        >
          Reverse
        </button>

        {(sortValue || isReverse) && (
          <button
            onClick={() => {
              setSortValue('');
              setIsReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
