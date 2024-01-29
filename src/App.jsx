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

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_LENGTH = 'Sort by length';

function getPreparedGoods(goods, { sortField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_ALPHABETICALLY:

        return preparedGoods
          .sort((good1, good2) => good1.localeCompare(good2));
      case SORT_LENGTH:

        return preparedGoods
          .sort((good1, good2) => good1.length - good2.length);
      default:
        return preparedGoods;
    }
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortReverse, setSortReverse] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, sortReverse },
  );

  if (sortReverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField.indexOf(SORT_ALPHABETICALLY) === -1,
          })}
          onClick={() => (
            setSortField(SORT_ALPHABETICALLY)
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField.indexOf(SORT_LENGTH) === -1,
          })}
          onClick={() => (
            setSortField(SORT_LENGTH)
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortReverse === false,
          })}
          onClick={() => (
            setSortReverse(!sortReverse)
          )}
        >
          Reverse
        </button>

        {
          (visibleGoods.toString() !== goodsFromServer.toString()) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortField('');
                setSortReverse(false);
              }
              }
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        { visibleGoods.map((good, index) => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
