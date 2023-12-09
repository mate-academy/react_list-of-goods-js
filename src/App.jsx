import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

import { useState } from 'react';
import { ProductList } from './components/ProductList';

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
const SORT_BY_REVERSE = 'reverse';

const getPreperedData = (goods, sortedBy) => {
  const preperedGoods = [...goodsFromServer];

  if (sortedBy === SORT_BY_REVERSE) {
    return preperedGoods.reverse();
  }

  if (sortedBy === '') {
    return goodsFromServer;
  }

  const sortedGoods = preperedGoods.sort((good1, good2) => {
    switch (sortedBy) {
      case SORT_BY_ALPHABET:
        return good1.localeCompare(good2);

      case SORT_BY_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  return sortedGoods;
};

export const App = () => {
  const [sortedBy, setSortedBy] = useState('');
  const goods = getPreperedData(goodsFromServer, sortedBy);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedBy !== SORT_BY_ALPHABET && 'is-light'}`}
          onClick={() => setSortedBy(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortedBy !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortedBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortedBy !== SORT_BY_REVERSE,
          })}
          onClick={() => setSortedBy(SORT_BY_REVERSE)}
        >
          Reverse
        </button>

        {sortedBy !== '' && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setSortedBy('')}
          >
            Reset
          </button>
        )}

      </div>

      <ProductList goods={goods} />
    </div>
  );
};
