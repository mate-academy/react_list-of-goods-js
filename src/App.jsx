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
const REVERSE = 'reverse';
const EMPTY = '';

function getPreparedGoods(goods, { sortField, reverseField }) {
  let preparedGoods = [...goods];

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

  if (reverseField) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

function resetField(field) {
  field(EMPTY);
}

export const App = () => {
  const [sortField, setSortField] = useState(EMPTY);
  const [reverseField, setReverseField] = useState(EMPTY);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, reverseField },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortField(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverseField !== REVERSE,
          })}
          onClick={() => setReverseField(
            reverseField === REVERSE ? EMPTY : REVERSE,
          )}
        >
          Reverse
        </button>

        {
          (sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              resetField(setSortField);
              resetField(setReverseField);
            }}
          >
            Reset
          </button>
          )
        }

      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
