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

const SORT_ALPHABET = 'Sort alphabetically';
const SORT_LENGTH = 'Sort by length';
const REVERSE = 'Reverse';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState(null);
  const [reverse, setReverse] = useState(false);

  const sortByAlphabet = () => {
    if (reverse) {
      setVisibleGoods(
        [...visibleGoods].sort().reverse(),
      );
    } else {
      setVisibleGoods(
        [...visibleGoods].sort(),
      );
    }

    setSortField(SORT_ALPHABET);
  };

  const sortByLength = () => {
    if (reverse) {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good2.length - good1.length),
      );
    } else {
      setVisibleGoods(
        [...visibleGoods].sort((good1, good2) => good1.length - good2.length),
      );
    }

    setSortField(SORT_LENGTH);
  };

  const reverseGood = () => {
    const reversedGoods = [...visibleGoods].reverse();

    setVisibleGoods(reversedGoods);

    setReverse(!reverse);
  };

  const resetGood = () => {
    setVisibleGoods(goodsFromServer);
    setSortField(null);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={`button is-info ${sortField === SORT_ALPHABET ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortField === SORT_LENGTH ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGood}
          type="button"
          className={`button is-warning ${reverse === REVERSE ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            onClick={resetGood}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
