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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [isSortedA, setSortedA] = useState(false);
  const [isSortedL, setSortedL] = useState(false);
  const [isReversed, setReversed] = useState(false);

  function reset() {
    setGoods(goodsFromServer);
    setSortedA(false);
    setSortedL(false);
    setReversed(false);
  }

  function sortAlphabetically() {
    if (!isSortedA) {
      setGoods(
        [...goods].sort((a, b) => {
          if (a < b) {
            return -1;
          }

          if (a > b) {
            return 1;
          }

          return 0;
        }),
      );
      if (isReversed) {
        setGoods([...goods].reverse());
      }

      setSortedA(true);
      setSortedL(false);
    }
  }

  function sortByLength() {
    if (!isSortedL) {
      setGoods([...goods].sort((a, b) => a.length - b.length));
      if (isReversed) {
        setGoods([...goods].reverse());
      }

      setSortedL(true);
      setSortedA(false);
    }
  }

  function reverse() {
    setGoods([...goods].reverse());
    setReversed(!isReversed);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isSortedA && `is-light`}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isSortedL && `is-light`}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed && `is-light`}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {(isSortedA || isSortedL || isReversed) && (
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
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
