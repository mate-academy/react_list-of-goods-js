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
const REVERSE = 'reverse';

function getPreparedGoods(goods, { sortField, reverse }) {
  const preparedGoods = [...goods];

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

  if (reverse !== '') {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setsortField] = useState('');
  const [reverse, setReverse] = useState('');
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, reverse },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setsortField(SORT_FIELD_ALPHABET);
          }}
          type="button"
          className={`button is-success ${cn({
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setsortField(SORT_FIELD_LENGTH);
          }}
          type="button"
          className={`button is-success ${cn({
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            if (reverse !== '') {
              setReverse('');
            } else {
              setReverse(REVERSE);
            }
          }
        }
          type="button"
          className={`button is-success ${cn({
            'is-light': reverse !== REVERSE,
          })}`}
        >
          Reverse
        </button>

        {(sortField === '' && reverse === '') || (
          <button
            onClick={() => {
              setsortField('');
              setReverse('');
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
