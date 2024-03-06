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

const SORT_BY_ALPHABETICALLY = 1;
const SORT_BY_LENGTH = 2;

function getPreparedGoods(goods, { sortField, isReverse }) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(0);
  const [isReverse, setIsReverse] = useState(false);

  const visibleleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });

  const reverseBtn = () => {
    setIsReverse(current => !current);
  };

  const resetBtn = () => {
    setSortField(0);
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_BY_ALPHABETICALLY
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SORT_BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_BY_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReverse ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={reverseBtn}
        >
          Reverse
        </button>

        {sortField || isReverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetBtn}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
