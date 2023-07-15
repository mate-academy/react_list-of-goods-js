import { useState } from 'react';

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

function getPreparedGoods(goods, sortField, isReversed) {
  let preparedGoods = [...goods];

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

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [isRevers, setIsRevers] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortBy, isRevers);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== SORT_FIELD_ALPHABET && 'is-light'}`}
          onClick={() => setSortBy(SORT_FIELD_ALPHABET)}

        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== SORT_FIELD_LENGTH && 'is-light'}`}
          onClick={() => setSortBy(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isRevers === false && 'is-light'}`}
          onClick={() => setIsRevers(!isRevers)}
        >
          Reverse
        </button>

        {(sortBy !== '' || isRevers !== false) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsRevers(false);
              setSortBy('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
