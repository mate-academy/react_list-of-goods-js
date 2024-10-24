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


const SORT_FILED_ALPHABET = 'alphabet';
const SORT_FILED_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FILED_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FILED_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {'is-light': sortField !== SORT_FILED_ALPHABET})}
          onClick={() => setSortField(SORT_FILED_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {'is-light': sortField !== SORT_FILED_LENGTH})}
          onClick={() => setSortField(SORT_FILED_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning', {'is-light': isReverse !== true})}
          onClick={() => (setIsReverse(!isReverse))}
        >
          Reverse
        </button>

        {(sortField !== '' || isReverse) && (
          <button
            onClick={() => {
              setSortField('');
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
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))
        }
      </ul>
    </div>
  );
};