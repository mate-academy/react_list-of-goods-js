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

function getPreparedGoods(listOfgoods, sortField, reverseStatus) {
  const preparedGoods = [...listOfgoods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverseStatus) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseStatus, setReverseStatus] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, sortField, reverseStatus);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => {
            if (sortField === SORT_FIELD_ALPHABET) {
              setSortField('');
            } else {
              setSortField(SORT_FIELD_ALPHABET);
            }
          }}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            if (sortField === SORT_FIELD_LENGTH) {
              setSortField('');
            } else {
              setSortField(SORT_FIELD_LENGTH);
            }
          }}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverseStatus,
          })}
          onClick={() => setReverseStatus(!reverseStatus)}
        >
          Reverse
        </button>
        {sortField || reverseStatus ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseStatus(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>
      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
