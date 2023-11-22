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

const SORT_CONDITION_ALPHABET = 'alphabet';
const SORT_CONDITION_LENGTH = 'length';

function sortBy(goods, condition) {
  const sortedGoods = [...goods];

  switch (condition) {
    case SORT_CONDITION_ALPHABET:
      return sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
    case SORT_CONDITION_LENGTH:
      return sortedGoods.sort((good1, good2) => good1.length - good2.length);
    default:
      return sortedGoods;
  }
}

export const App = () => {
  const [sortCondition, setSortCondition] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = reverse
    ? sortBy(goodsFromServer, sortCondition).reverse()
    : sortBy(goodsFromServer, sortCondition);

  const reset = () => {
    setSortCondition('');
    setReverse(false);
  };

  const listIsReset = () => sortCondition === '' && !reverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortCondition !== SORT_CONDITION_ALPHABET && 'is-light'
          }`}
          onClick={() => setSortCondition(SORT_CONDITION_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortCondition !== SORT_CONDITION_LENGTH && 'is-light'
          }`}
          onClick={() => setSortCondition(SORT_CONDITION_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            !reverse && 'is-light'
          }`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {!listIsReset() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (<li data-cy="Good" key={good}>{good}</li>))}
      </ul>
    </div>
  );
};
