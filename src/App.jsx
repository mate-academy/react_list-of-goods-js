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
  const [isReversed, setIsReversed] = useState(false);
  const [isSortAlphabeticallyActive, setIsSortAlphabeticallyActive]
  = useState(false);
  const [isSortByLengthActive, setIsSortByLengthActive] = useState(false);

  const isGoodsNotInOriginalOrder
  = visibleGoods.join() !== goodsFromServer.join();

  const sortAlphabetically = () => {
    const sortedGoods = [...visibleGoods].sort();

    setVisibleGoods(isSortAlphabeticallyActive
      ? sortedGoods.reverse()
      : sortedGoods);
    setIsReversed(false);
    setIsSortAlphabeticallyActive(!isSortAlphabeticallyActive);
    setIsSortByLengthActive(false);
  };

  const sortByLength = () => {
    const sortedGoods = [...visibleGoods].sort(
      (good1, good2) => good1.length - good2.length,
    );

    setVisibleGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setIsReversed(false);
    setIsSortAlphabeticallyActive(false);
    setIsSortByLengthActive(!isSortByLengthActive);
  };

  const reverseGoods = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setIsReversed(!isReversed);
    setIsSortAlphabeticallyActive(false);
    setIsSortByLengthActive(false);
  };

  const resetGoods = () => {
    setVisibleGoods(goodsFromServer);
    setIsReversed(false);
    setIsSortAlphabeticallyActive(false);
    setIsSortByLengthActive(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isSortAlphabeticallyActive ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isSortByLengthActive ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isGoodsNotInOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
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
