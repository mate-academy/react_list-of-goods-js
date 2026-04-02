import { useState, useMemo } from 'react';
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

// Sort fields names
const SORT_FIELD_BY_ALPHABET = 'alphabet';
const SORT_FIELD_BY_LENGTH = 'length';

export const App = () => {
  // Mutually exclusive filters (only one active at a time)
  const [sortBy, setSortBy] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = useMemo(() => {
    const goods = [...goodsFromServer];

    if (sortBy === SORT_FIELD_BY_ALPHABET) {
      goods.sort((a, b) => a.localeCompare(b));
    }

    if (sortBy === SORT_FIELD_BY_LENGTH) {
      goods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  }, [sortBy, isReversed]);

  const toggleReverse = () => {
    setIsReversed(prevState => !prevState);
  };

  const resetAll = () => {
    setSortBy(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SORT_FIELD_BY_ALPHABET,
          })}
          onClick={() => {
            setSortBy(SORT_FIELD_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_FIELD_BY_LENGTH,
          })}
          onClick={() => {
            setSortBy(SORT_FIELD_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => toggleReverse()}
        >
          Reverse
        </button>

        {(isReversed || sortBy !== null) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetAll}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
