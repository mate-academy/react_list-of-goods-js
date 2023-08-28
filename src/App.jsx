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

const DEFAULT_SORT_FIELD_VALUE = '';
const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goodsFromServer];

  if (sortField) {
    preparedGoods.sort((currentGood, nextGood) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return currentGood.localeCompare(nextGood);

        case SORT_FIELD_LENGTH:
          return currentGood.length - nextGood.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(DEFAULT_SORT_FIELD_VALUE);
  const [isReversed, setIsReversed] = useState(false);

  const initialGoods = getPreparedGoods(
    goodsFromServer,
    {
      sortField,
      isReversed,
    },
  );

  const clearSort = () => {
    setSortField(DEFAULT_SORT_FIELD_VALUE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(`button`, `is-info`, {
            'is-light': sortField !== SORT_FIELD_ALPHABET,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(`button`, `is-success`, {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(`button`, `is-warning`, {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => clearSort()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {initialGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
