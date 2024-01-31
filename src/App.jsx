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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'byLength';
const SORT_RESET = '';

function getPreparedGoods(goods, sortOrder, reverseOrder) {
  const preparedGoods = [...goods];

  if (sortOrder === SORT_ALPHABETICALLY) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortOrder === SORT_BY_LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reverseOrder) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortOrder, setSortOrder] = useState('');
  const [reverseOrder, setReverseOrder] = useState(false);

  const sortedGoods
    = getPreparedGoods(goodsFromServer, sortOrder, reverseOrder);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortOrder === SORT_ALPHABETICALLY
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={() => setSortOrder(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortOrder === SORT_BY_LENGTH
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={() => setSortOrder(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseOrder
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={() => setReverseOrder(!reverseOrder)}
        >
          Reverse
        </button>

        {(sortOrder === SORT_ALPHABETICALLY
          || sortOrder === SORT_BY_LENGTH
          || reverseOrder)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setSortOrder(SORT_RESET);
                setReverseOrder(false);
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
