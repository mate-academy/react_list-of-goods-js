import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import cn from 'classnames';
import { GoodLIst } from './components/GoodList';

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

const SORT_GOODS_ALPHABET = 'alphabet';
const SORT_GOODS_LENGTH = 'length';
const SORT_GOODS_REVERSE = 'reverse';

function getPreparedGoods(goods, { sortField, query }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_GOODS_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_GOODS_LENGTH:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  if (query) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [query, setQuery] = useState('');

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, query },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_GOODS_ALPHABET,
          })}
          onClick={() => setSortField(SORT_GOODS_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_GOODS_LENGTH,
          })}
          onClick={() => setSortField(SORT_GOODS_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': query !== SORT_GOODS_REVERSE,
          })}
          onClick={() => setQuery(
            query === SORT_GOODS_REVERSE
              ? ''
              : SORT_GOODS_REVERSE,
          )}
        >
          Reverse
        </button>

        {(sortField !== '' || query !== '') && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setQuery('');
              setSortField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodLIst goods={visibleGoods} />
    </div>
  );
};
