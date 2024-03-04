import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FILED_ALPHABET = 'alphabet';
const SORT_FILED_LENGT = 'length';

function getPrepareGoods(goods, { sortField, isReverse }) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FILED_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_FILED_LENGT:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepearedGoods = prepearedGoods.reverse();

    return prepearedGoods;
  }

  return prepearedGoods;
}

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

export const App = () => {
  const [sortField, setSortField] = useState(false);
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, {
    sortField,
    isReverse,
  });

  const reset = () => {
    setSortField(false);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FILED_ALPHABET)}
          type="button"
          className={cn(
            {
              'is-light': sortField !== SORT_FILED_ALPHABET,
            },
            'button is-info',
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FILED_LENGT)}
          type="button"
          className={cn(
            {
              'is-light': sortField !== SORT_FILED_LENGT,
            },
            'button is-success',
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(prev => !prev)}
          type="button"
          className={cn(
            {
              'is-light': !isReverse,
            },
            'button is-success',
          )}
        >
          Reverse
        </button>

        {(isReverse || sortField) && (
          <button
            onClick={reset}
            type="button"
            className={cn(
              {
                'is-light': !sortField,
              },'button is-success',
            )}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
