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

export const SORT_FIELD = {
  ALPH: 'alphabetical',
  LENGTH: 'length',
};

function visibleGoods(goods, sortField, sortReverse) {
  const newGoods = [...goods];

  if (!sortField && sortReverse) {
    return newGoods.reverse();
  }

  if (sortField) {
    newGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD.LENGTH:
          return (sortReverse)
            ? good2.length - good1.length
            : good1.length - good2.length;

        case SORT_FIELD.ALPH:
          return (sortReverse)
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return newGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortReverse, setSortReverse] = useState(false);
  const sortedGoods = visibleGoods(goodsFromServer, sortField, sortReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD.ALPH },
          )}
          onClick={() => {
            setSortField(SORT_FIELD.ALPH);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD.LENGTH },
          )}
          onClick={() => {
            setSortField(SORT_FIELD.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !sortReverse },
          )}
          onClick={() => {
            setSortReverse(!sortReverse);
          }}
        >
          Reverse
        </button>

        {(sortField !== '' || sortReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setSortReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
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
