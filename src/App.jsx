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

const SORT_METHOD_ALPHABET = 'alphabet';
const SORT_METHOD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, reverse) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_METHOD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_METHOD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse !== false) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setsortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, sortField, reverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setsortField(SORT_METHOD_ALPHABET);
          }}
          type="button"
          className={`button is-info ${cn({
            'is-light': sortField !== SORT_METHOD_ALPHABET,
          })}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setsortField(SORT_METHOD_LENGTH);
          }}
          type="button"
          className={`button is-success ${cn({
            'is-light': sortField !== SORT_METHOD_LENGTH,
          })}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverse(!reverse);
          }
        }
          type="button"
          className={`button is-warning  ${cn({
            'is-light': reverse === false,
          })}`}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            onClick={() => {
              setsortField('');
              setReverse(false);
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
