import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';
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

const getPrepareGoods = (goods, { sortedBy, isReverse }) => {
  const prepareGoods = [...goods];

  if (sortedBy) {
    prepareGoods.sort((a, b) => {
      switch (sortedBy) {
        case SORT_BY_ALPHABET:
          return a.localeCompare(b);

        case SORT_BY_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepareGoods.reverse();
  }

  return prepareGoods;
};

export const App = () => {
  const [sortedBy, setSortedBy] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, {
    sortedBy,
    isReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortedBy(SORT_BY_ALPHABET)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortedBy !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortedBy(SORT_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortedBy !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(!isReverse)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
        >
          Reverse
        </button>

        {(sortedBy || isReverse) && (
          <button
            onClick={() => {
              setSortedBy('');
              setIsReverse(false);
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
