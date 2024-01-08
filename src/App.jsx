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

const IS_SORTED_ALPHABET = 'A';
const IS_SORTED_LENGTH = 'L';

function getPreparedGoods(goods, { isSorted, isReversed, query }) {
  const preparedGoods = [...goods];

  switch (isSorted) {
    case IS_SORTED_ALPHABET:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case IS_SORTED_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:

      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [isSorted, setIsSorted] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { isSorted, isReversed });

  const reset = () => {
    setIsSorted('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': isSorted !== IS_SORTED_ALPHABET,
          })}
          onClick={() => setIsSorted(IS_SORTED_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': isSorted !== IS_SORTED_LENGTH,
          })}
          onClick={() => setIsSorted(IS_SORTED_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(isSorted !== '' || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
