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

const SORT_BY_ALPHABETICAL = 'alphabetical';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_BY_ALPHABETICAL:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_BY_LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const resetList = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_ALPHABETICAL)}
          type="button"
          className={`button is-info ${
            sortField === SORT_BY_ALPHABETICAL
              ? ''
              : 'is-light'
          }`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={`button is-success ${
            sortField === SORT_BY_LENGTH
              ? ''
              : 'is-light'
          }`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={`button is-warning ${isReversed
            ? ''
            : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField || isReversed)
          && (
          <button
            onClick={resetList}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
          )}
      </div>

      <ul>
        {preparedGoods.map((good, index) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
