import 'bulma/css/bulma.css';
import { useState } from 'react';
import './App.scss';
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

const SORT_BY_ALPHABET = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

function formatGoods(goods, sortMethod, isReversed) {
  const preparedGoods = [...goods];

  switch (sortMethod) {
    case SORT_BY_ALPHABET:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SORT_BY_LENGTH:
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
  const [isReversed, setIsReversed] = useState(false);
  const [sortMethod, setSortMethod] = useState('');

  const visibleGoods = formatGoods(goodsFromServer, sortMethod, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortMethod(SORT_BY_ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortMethod !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortMethod(SORT_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortMethod !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed === false,
          })}
        >
          Reverse
        </button>

        {(sortMethod || isReversed) && (
          <button
            onClick={() => {
              setIsReversed(false);
              setSortMethod('');
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
