import cn from 'classnames';
import { useState } from 'react';

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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPreparedGood(goods, { sortBy, order }) {
  let sorting = null;
  const newGoods = [...goods];

  if (sortBy) {
    switch (sortBy) {
      case SORT_BY_ALPHABET:
        sorting = (good1, good2) => good1.localeCompare(good2);

        break;
      case SORT_BY_LENGTH:
        sorting = (good1, good2) => good1.length - good2.length;

        break;

      default:
        break;
    }

    newGoods.sort(sorting);
  }

  if (order) {
    newGoods.reverse();
  }

  return newGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState(false);

  const reverse = () => {
    setSortBy('');
    setOrder(false);
  };

  const goods = getPreparedGood([...goodsFromServer], { sortBy, order });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SORT_BY_ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortBy !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(SORT_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setOrder(!order)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !order,
          })}
        >
          Reverse
        </button>

        {(sortBy || order) && (
          <button
            onClick={reverse}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
