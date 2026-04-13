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

const sortbyLetter = 'sortbyLeter';
const sortbyLength = 'sortbyLength';

function getPrepareGoods(goods, sortField, revers) {
  const prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case sortbyLetter:
          return good1.localeCompare(good2);
        case sortbyLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (revers) {
    return prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortReverse, setSortReverse] = useState(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, sortField, sortReverse);
  const isResetVisible = sortField !== '' || sortReverse;
  const reset = () => {
    setSortField('');
    setSortReverse(false);
  };

  const sortByLength = () => {
    setSortField(sortbyLength);
  };

  const sortByLetter = () => {
    setSortField(sortbyLetter);
  };

  const reverse = () => {
    if (sortReverse) {
      setSortReverse(false);

      return;
    }

    setSortReverse(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByLetter}
          type="button"
          className={cn('button  is-info ', {
            'is-light': sortField !== sortbyLetter,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn('button is-success ', {
            'is-light': sortField !== sortbyLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn('button is-warning ', {
            'is-light': sortReverse === false,
          })}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
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
