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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, { sortedBy, isReversed }) {
  const preparedGoods = [...goods];

  if (sortedBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortedBy) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortedBy, setSortedBy] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortedBy,
    isReversed,
  });

  const reset = () => {
    setIsReversed(false);
    setSortedBy('');
  };

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={cn('button', 'is-info ', {
              'is-light': sortedBy !== SORT_BY_ALPHABET,
            })}
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
              'is-light': !isReversed,
            })}
            onClick={() => setIsReversed(reversed => !reversed)}
          >
            Reverse
          </button>

          {(sortedBy || isReversed) ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => reset()}
            >
              Reset
            </button>
          ) : ''}
        </div>

        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
