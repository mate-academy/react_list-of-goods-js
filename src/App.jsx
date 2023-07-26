import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';
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
const SORT_BY_LENGTH = 'Sort by length';

const getPreparedGoods = (goods, { sortField, toReverse }) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (toReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [toReverse, setToReverse] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, toReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_ALPHABETICALLY)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            if (toReverse === false) {
              setToReverse(true);
            } else {
              setToReverse(false);
            }
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': toReverse === false,
          })}
        >
          Reverse
        </button>

        {
          sortField || toReverse
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
        {visibleGoods.map(good => (<li data-cy="Good" key={good}>{good}</li>))}
      </ul>
    </div>
  );
};
