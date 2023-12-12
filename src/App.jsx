import cn from 'classnames';
import { useState } from 'react';

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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

let isSorted = false;

const getSortedGoods = (goods, sortField, isReverse) => {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          isSorted = true;

          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          isSorted = true;

          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  } else if (isReverse) {
    isSorted = true;
  } else {
    isSorted = false;
  }

  return isReverse ? sortedGoods.reverse() : sortedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = getSortedGoods(goodsFromServer, sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          className={cn(
            'button is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn(
            'button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => (isReverse
            ? setIsReverse(false)
            : setIsReverse(true))}
          className={cn(
            'button is-warning',
            { 'is-light': !isReverse },
          )}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            onClick={() => {
              setIsReverse(false);
              setSortField('');
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
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
