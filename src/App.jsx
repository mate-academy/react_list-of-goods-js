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
const SORT_FIELD_ALFAB = 'alfab';
const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_REVERSE = 'reverse';

function getPrepearedGoods(goods, { sortField, sortReverse }) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALFAB:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
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
  const [sortField, setsortField] = useState('');
  const [sortReverse, setsortReverse] = useState('');
  const sortedGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    sortReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setsortField(SORT_FIELD_ALFAB)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALFAB,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setsortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() =>
            sortReverse
              ? setsortReverse('')
              : setsortReverse(SORT_FIELD_REVERSE)
          }
          type="button"
          className={cn('button is-warning', {
            'is-light': !sortReverse,
          })}
        >
          Reverse
        </button>

        {(sortField || sortReverse) && (
          <button
            onClick={() => {
              setsortField('');
              setsortReverse('');
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
