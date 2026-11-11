import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FIELD_LETTER = 'sortByLetter';
const SORT_FIELD_LENGTH = 'sortByLength';

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

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = [...goodsFromServer];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LETTER:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_LETTER)}
          type="button"
          className={cn(
            'button',
            'is-info',
            sortField !== SORT_FIELD_LETTER && 'is-light',
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn(
            'button',
            'is-info',
            sortField !== SORT_FIELD_LENGTH && 'is-light',
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button', 'is-warning', !isReversed && 'is-light')}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
