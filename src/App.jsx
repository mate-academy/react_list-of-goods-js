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
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [originalGoods] = useState(goodsFromServer);
  const [isSortedByName, setIsSortedByName] = useState(false);
  const [isSortedByLength, setIsSortedByLength] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  function sortByName() {
    const sortedGoods = [...visibleGoods].sort();

    setVisibleGoods(sortedGoods);
    setIsSortedByName(true);
    setIsSortedByLength(false);
    setIsReversed(false);
  }

  function sortByLength() {
    const sortedGoods = [...visibleGoods].sort(
      (good1, good2) => good1.length - good2.length,
    );

    setVisibleGoods(sortedGoods);
    setIsSortedByLength(true);
    setIsSortedByName(false);
    setIsReversed(false);
  }

  function reverseOrder() {
    const reversedGoods = [...visibleGoods].reverse();

    setVisibleGoods(reversedGoods);
    setIsReversed(!isReversed);
  }

  function resetOrder() {
    setVisibleGoods(originalGoods);
    setIsSortedByName(false);
    setIsSortedByLength(false);
    setIsReversed(false);
  }

  const showResetButton = isSortedByName || isSortedByLength || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByName}
          type="button"
          className={`button is-info ${!isSortedByName && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${!isSortedByLength && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseOrder}
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            onClick={resetOrder}
            type="button"
            className="button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
