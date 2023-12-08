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

const SORT_ALPHABET = 'alphabetically';
const SORT_LENGTH = 'length';

const sortGoods = (goods, sortField, reverseField = false) => {
  const currentGoods = [...goods];

  if (sortField) {
    currentGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    currentGoods.reverse();
  }

  return currentGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = sortGoods(goodsFromServer, sortField, reverse);

  const reset = () => {
    setSortField('');
    setReverse(false);
  };

  const handleSortAlphabet = () => {
    setSortField(SORT_ALPHABET);
  };

  const handleSortLength = () => {
    setSortField(SORT_LENGTH);
  };

  const handleSortReverse = () => {
    setReverse(!reverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleSortAlphabet}
          className={cn(
            'button', 'is-info', { 'is-light': sortField !== SORT_ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleSortLength}
          className={cn(
            'button', 'is-success', { 'is-light': sortField !== SORT_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleSortReverse}
          className={cn(
            'button', 'is-warning', { 'is-light': !reverse },
          )}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
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
        {visibleGoods.map(good => (<li key={good} data-cy="Good">{good}</li>))}
      </ul>
    </div>
  );
};
