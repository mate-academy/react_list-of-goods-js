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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, sortReversed }) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_ALPHABET:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_FIELD_LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (sortReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortReversed, setSortReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, sortReversed },
  );

  const reset = () => {
    setSortField('');
    setSortReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button', 'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
          )}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button', 'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button', 'is-warning',
            { 'is-light': !sortReversed },
          )}
          onClick={() => setSortReversed(!sortReversed)}
        >
          Reverse
        </button>

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
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
