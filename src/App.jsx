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

const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';

function getPreparedGoods(goods, sortBy, isReversed) {
  const result = [...goods];

  switch (sortBy) {
    case SORT_ALPHABET:
      result.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_LENGTH:
      result.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    result.reverse();
  }

  return result;
}

export const App = () => {
  const [sortBy, setSortBy] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  const isOriginalOrder = !sortBy && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_ALPHABET,
          })}
          onClick={() => setSortBy(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_LENGTH,
          })}
          onClick={() => setSortBy(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(r => !r)}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortBy(null);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
