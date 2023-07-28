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

const SORT_FIELD_LENGTH = 'Sort by length';
const SORT_FIELD_ALFABETICALLY = 'Sort alphabetically';

function getPreparedGoods(goods, { sortField, sortReverse }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_ALFABETICALLY:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (sortReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortReverse, setToReverse] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, sortReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALFABETICALLY)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALFABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            if (sortReverse === false) {
              setToReverse(true);
            } else {
              setToReverse(false);
            }
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortReverse === false,
          })}
        >
          Reverse
        </button>

        {
          sortField || sortReverse
            ? (
              <button
                onClick={() => {
                  setSortField('');
                  setToReverse(false);
                }}
                type="button"
                className="button is-danger is-light"
              >
                Reset
              </button>
            )
            : ''
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
