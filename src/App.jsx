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

const SORTED_BY_ALPHABET = 'name';
const SORTED_BY_LENGTH = 'length';

const getPreparedGoods = (goods, { sortField, isReversed }) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORTED_BY_ALPHABET:
          return good1.localeCompare(good2);

        case SORTED_BY_LENGTH:
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
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [showResetButton, setShowResetButton] = useState(false);

  const changedGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const clearSort = () => {
    setSortField('');
    setIsReversed(false);
    setShowResetButton(false);
  };

  const handleSortChange = (newSortField) => {
    setSortField(newSortField);
    setShowResetButton(true);
  };

  const handleReverseToggle = () => {
    setIsReversed(!isReversed);
    setShowResetButton(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSortChange(SORTED_BY_ALPHABET)}
          type="button"
          className={cn('button', {
            'is-info': sortField === SORTED_BY_ALPHABET,
            'is-light': sortField !== SORTED_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => handleSortChange(SORTED_BY_LENGTH)}
          type="button"
          className={cn('button', {
            'is-success': sortField === SORTED_BY_LENGTH,
            'is-light': sortField !== SORTED_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverseToggle}
          type="button"
          className={cn('button', {
            'is-warning': isReversed,
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            onClick={clearSort}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {changedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
