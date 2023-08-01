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

const SORT_FIELD = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';

function getPreparedGoods(goods, { sortField, sortLength, isReverse }) {
  let visibleGoods = [...goodsFromServer];

  if (sortField === SORT_FIELD) {
    visibleGoods = visibleGoods
      .sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortLength === SORT_FIELD_LENGTH) {
    visibleGoods = visibleGoods.sort(
      (goods1, goods2) => goods1.length - goods2.length,
    );
  }

  if (isReverse) {
    visibleGoods = visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortLength, setSortLength] = useState('');
  const [isReverse, setIsReverse] = useState('');

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    sortLength,
    isReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => {
            setSortField(SORT_FIELD);
            setSortLength('');
          }}
          className={cn('button', 'is-info',
            {
              'is-light': sortField !== SORT_FIELD,
            })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => {
            setSortLength(SORT_FIELD_LENGTH);
            setSortField('');
          }}
          className={cn('button', 'is-success',
            {
              'is-light': sortLength !== SORT_FIELD_LENGTH,
            })
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            setIsReverse(prev => !prev);
          }}
          className={cn('button', 'is-warning',
            {
              '': isReverse,
              'is-light': !isReverse,
            })
          }
        >
          Reverse
        </button>
        {(sortField || sortLength || isReverse) && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setSortLength('');
              setIsReverse('');
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
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
