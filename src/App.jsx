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

const SORT_FIELD_ALPHABET = 'abc';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortReverse, setSortReverse] = useState(false);
  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        return good1.localeCompare(good2);
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (sortReverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          className={cn("button is-info", {
            "is-light": sortField !== SORT_FIELD_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn("button is-success", {
            "is-light": sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setSortReverse(!sortReverse)}
          className={cn("button is-warning", {
            "is-light": sortReverse !== true,
          })}
        >
          Reverse
        </button>
        {(sortField || sortReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setSortReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
