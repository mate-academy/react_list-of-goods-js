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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const REVERSE_ORDER = 'reverse';

function orderedGoods(goods, sortField, orderBy) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
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

  if (orderBy === REVERSE_ORDER) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [orderBy, setOrderBy] = useState('');

  const visibleGoods = orderedGoods(goodsFromServer, sortField, orderBy);

  const handleSortByAlphabet = () => {
    setSortField(sortField === SORT_BY_ALPHABET ? '' : SORT_BY_ALPHABET);
  };

  const handleSortByLength = () => {
    setSortField(sortField === SORT_BY_LENGTH ? '' : SORT_BY_LENGTH);
  };

  const handleReverse = () => {
    setOrderBy(orderBy === REVERSE_ORDER ? '' : REVERSE_ORDER);
  };

  const handleReset = () => {
    setSortField('');
    setOrderBy('');
  };

  const isModified = sortField !== '' || orderBy !== '';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortByAlphabet}
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
            active: sortField === SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortByLength}
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
            active: sortField === SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={cn('button', 'is-warning', {
            'is-light': orderBy !== REVERSE_ORDER,
            active: orderBy === REVERSE_ORDER,
          })}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            onClick={handleReset}
            className={cn('button', 'is-danger')}
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
