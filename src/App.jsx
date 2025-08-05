import 'bulma/css/bulma.css';
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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = field => {
    setSortField(field);
    setIsReversed(false);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const reset = () => {
    setSortField(null);
    setIsReversed(false);
  };

  const preparedGoods = [...goodsFromServer];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return a.localeCompare(b);
        case SORT_FIELD_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort(SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ALPHABETICALLY && 'is-light'}`}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => handleSort(SORT_FIELD_LENGTH)}
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
