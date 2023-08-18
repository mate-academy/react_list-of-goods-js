import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';
import { useState } from 'react';

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

function getPreparedGoods(goods, { sortField, sortReversed }) {
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

  if (sortReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortReversed, setSortReversed] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, sortReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_ALPHABET)}
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortField !== SORT_BY_ALPHABET },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortField !== SORT_BY_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setSortReversed(!sortReversed)}
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': !sortReversed },
          )}
        >
          Reverse
        </button>

        {(sortField || sortReversed) && (
          <button
            onClick={() => {
              setSortField('');
              setSortReversed(false);
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
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
