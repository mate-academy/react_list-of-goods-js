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
  const [goodsOrdered, setGoodsOrdered] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(null);

  const sortAlphabetically = () => {
    const sorted = [...goodsOrdered].sort((a, b) => a.localeCompare(b));

    if (isReversed) {
      sorted.reverse();
    }

    setSortType('alphabetically');

    return setGoodsOrdered(sorted);
  };

  const sortByLength = () => {
    const goodsCopy = [...goodsFromServer];

    const sorted = goodsCopy.sort(
      (good1, good2) => good1.length - good2.length,
    );

    if (isReversed) {
      sorted.reverse();
    }

    setSortType('length');

    return setGoodsOrdered(sorted);
  };

  const reverseArray = () => {
    setIsReversed(!isReversed);
    const reversed = [...goodsOrdered].reverse();

    return setGoodsOrdered(reversed);
  };

  const reset = () => {
    setIsReversed(false)
    setSortType(null);

    return setGoodsOrdered(goodsFromServer);
  };

  const arraysAreEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    return arr1.every((item, index) => item === arr2[index]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === 'alphabetically'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === 'length' ? 'button is-info' : 'button is-info is-light'
          }
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-success' : 'button is-success is-light'
          }
          onClick={reverseArray}
        >
          Reverse
        </button>

        {!arraysAreEqual(goodsOrdered, goodsFromServer) ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goodsOrdered.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
