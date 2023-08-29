import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { useState } from 'react';

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

const SORT_BY_NAME = 'alphabetically';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_BY_NAME:
        preparedGoods.sort((a, b) => a.localeCompare(b));
        break;
      case SORT_BY_LENGTH:
        preparedGoods.sort((a, b) => a.length - b.length);
        break;
      default: break;
    }
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const sortedGoods = getPreparedGoods(goodsFromServer,
    {
      sortField,
      isReverse,
    });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_BY_NAME,
          })}
          onClick={() => (setSortField(SORT_BY_NAME))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => (setSortField(SORT_BY_LENGTH))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => (setIsReverse(!isReverse))}
        >
          Reverse
        </button>
        {(sortField !== '' || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
