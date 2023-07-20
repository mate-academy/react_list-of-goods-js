import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './GoodList/GoodList';

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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPreperdGoods(goods, { sortField, reverse }) {
  const preperedGoods = [...goods];

  if (sortField) {
    preperedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreperdGoods(goodsFromServer, {
    sortField, reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button', 'is-info',
            { 'is-light': sortField !== SORT_BY_ALPHABET },
          )}
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button', 'is-success',
            { 'is-light': sortField !== SORT_BY_LENGTH },
          )}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={visibleGoods} />
    </div>
  );
};
