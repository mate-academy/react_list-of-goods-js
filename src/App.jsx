import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
const SORT_FIELD = {
  ALFAB: 'alfab',
  LENGTH: 'length',
};

function getPrepearedGoods(goods, { sortField, sortReverse }) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD.ALFAB:
          return good1.localeCompare(good2);

        case SORT_FIELD.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (sortReverse) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setsortField] = useState(false);
  const [sortReverse, setsortReverse] = useState(false);
  const sortedGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    sortReverse,
  });

  const resetSort = () => {
    setsortField(false);
    setsortReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setsortField(SORT_FIELD.ALFAB)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD.ALFAB,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setsortField(SORT_FIELD.LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setsortReverse(!sortReverse)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !sortReverse,
          })}
        >
          Reverse
        </button>

        {(sortField || sortReverse) && (
          <button
            onClick={resetSort}
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
