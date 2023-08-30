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

const ALPHABET_SORT_FIELD = 'alphabet';
const LENGTH_SORT_FIELD = 'length';
const DEFAULT_SORT_FIELD_VALUE = '';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((firstGood, secondGood) => {
      switch (sortField) {
        case ALPHABET_SORT_FIELD:
          return firstGood.localeCompare(secondGood);

        case LENGTH_SORT_FIELD:
          return firstGood.length - secondGood.length;

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
            'is-light': sortField !== ALPHABET_SORT_FIELD,
          })}
          onClick={() => setSortField(ALPHABET_SORT_FIELD)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(`button`, `is-success`, {
            'is-light': sortField !== LENGTH_SORT_FIELD,
          })}
          onClick={() => setSortField(LENGTH_SORT_FIELD)}
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
