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
const SORT_REVERSE = 'reverse';

const sortButtons = [
  {
    name: 'Sort alphabetically',
    type: SORT_ALPHABET,
    style: 'is-info',
  },
  {
    name: 'Sort by length',
    type: SORT_LENGTH,
    style: 'is-success',
  },
  {
    name: 'Reverse',
    type: SORT_REVERSE,
    style: 'is-warning',
  },
];

function listOfGoods(goods, sortType, sortReversed) {
  const sortedGoods = [...goods];

  if (sortType === SORT_ALPHABET) {
    sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === SORT_LENGTH) {
    sortedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (sortReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortReversed, setSortReversed] = useState(false);

  const visibleGoods = listOfGoods(
    goodsFromServer, sortField, sortReversed,
  );

  const handleSort = (type) => {
    if (type === SORT_REVERSE) {
      setSortReversed(!sortReversed);
    } else {
      setSortField(type);
    }
  };

  const reset = () => {
    setSortField('');
    setSortReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        {sortButtons.map(({ name, type, style }) => (
          <button
            key={type}
            type="button"
            className={cn('button', style, {
              'is-light': type === SORT_REVERSE
                ? !sortReversed
                : type !== sortField,
            })}
            onClick={() => handleSort(type)}
          >
            {name}
          </button>
        ))}

        {(sortField || sortReversed) && (
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
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
