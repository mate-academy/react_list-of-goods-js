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

const SORT_METHOD = Object.freeze({
  alphabetically: 'alphabetically',
  byLength: 'byLength',
  reset: 'reset',
});

function sortGoods(goods, { sortMethod, isReverse }) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortMethod) {
      case SORT_METHOD.alphabetically:
        return good1.localeCompare(good2);

      case SORT_METHOD.byLength:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (sortMethod === SORT_METHOD.reset) {
    return isReverse ? [...goods].reverse() : goods;
  }

  return isReverse ? [...preparedGoods].reverse() : preparedGoods;
}

export const App = () => {
  const [sortMethod, setSortMethod] = useState(SORT_METHOD.reset);
  const [isReverse, setIsReverse] = useState(false);

  const sortedGoods = sortGoods(goodsFromServer, { sortMethod, isReverse });
  const isResetVisible = !(sortMethod === SORT_METHOD.reset && !isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortMethod(SORT_METHOD.alphabetically)}
          type="button"
          className={`button is-info ${sortMethod !== SORT_METHOD.alphabetically && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortMethod(SORT_METHOD.byLength)}
          type="button"
          className={`button is-success ${sortMethod !== SORT_METHOD.byLength && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(!isReverse)}
          type="button"
          className={`button is-warning ${!isReverse && 'is-light'}`}
        >
          Reverse
        </button>
        {isResetVisible && (
          <button
            onClick={() => {
              setSortMethod(SORT_METHOD.reset);
              setIsReverse(false);
            }}
            type="button"
            className="button is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
