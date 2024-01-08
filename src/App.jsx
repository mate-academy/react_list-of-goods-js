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

const IS_SORTED_A = 'A';
const IS_SORTED_L = 'L';
const IS_SORTED_R = 'R';

function getPreparedGoods(goods, { isSorted }) {
  const preparedGoods = [...goods];

  switch (isSorted) {
    case IS_SORTED_A:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case IS_SORTED_L:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    case IS_SORTED_R:
      preparedGoods.reverse();
      break;

    default:

      break;
  }

  return preparedGoods;
}

export const App = () => {
  const [isSorted, setIsSorted] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer, { isSorted });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': isSorted !== IS_SORTED_A,
          })}
          onClick={() => setIsSorted(IS_SORTED_A)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': isSorted !== IS_SORTED_L,
          })}
          onClick={() => setIsSorted(IS_SORTED_L)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isSorted !== IS_SORTED_R,
          })}
          onClick={() => setIsSorted(isSorted === IS_SORTED_R
            || (isSorted === IS_SORTED_A && isSorted === IS_SORTED_R)
            ? '' : IS_SORTED_R)}
        >
          Reverse
        </button>

        {isSorted !== '' && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setIsSorted('')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
