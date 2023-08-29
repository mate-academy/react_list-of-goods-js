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

const SORT_FIELD_LETTERS = 'letters';
const SORT_FIELD_LENGTH = 'length';
const REVESER_DEFAULT_VALUE = false;

function getPreparedGoods(goods, { sortField, reverseField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_LETTERS:
          return a.localeCompare(b);
        case SORT_FIELD_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(REVESER_DEFAULT_VALUE);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    {
      sortField, reverseField,
    },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_LETTERS)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_LETTERS,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverseField,
          })}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            onClick={() => {
              setSortField('');
              setReverseField(REVESER_DEFAULT_VALUE);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
