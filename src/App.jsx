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

const ALPHABET_SORT_VALUE = 'alphabet';
const LENGTH_SORT_VALUE = 'length';
const DEFAULT_SORT_VALUE = '';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case ALPHABET_SORT_VALUE:
          return good1.localeCompare(good2);

        case LENGTH_SORT_VALUE:
          return good1.length - good2.length;

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
  const [sortField, setSortField] = useState(DEFAULT_SORT_VALUE);
  const [isReversed, setIsReversed] = useState(false);
  const reverseButton = (sortField || isReversed);

  const initialGoods = getPreparedGoods(
    goodsFromServer,
    {
      sortField,
      isReversed,
    },
  );

  const handleButtonReset = () => {
    setSortField(DEFAULT_SORT_VALUE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(`button`, `is-info`, {
            'is-light': sortField !== ALPHABET_SORT_VALUE,
          })}
          onClick={() => setSortField(ALPHABET_SORT_VALUE)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(`button`, `is-success`, {
            'is-light': sortField !== LENGTH_SORT_VALUE,
          })}
          onClick={() => setSortField(LENGTH_SORT_VALUE)}
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

        {reverseButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleButtonReset}
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
