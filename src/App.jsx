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

  const sortAlphabetically = () => {
    const sortedGoods = [...visibleGoods].sort();

    setVisibleGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setIsReversed(false);
  };

  const sortByLength = () => {
    const sortedGoods = [...visibleGoods].sort(
      (good1, good2) => good1.length - good2.length,
    );

    setVisibleGoods(isReversed ? sortedGoods.reverse() : sortedGoods);
    setIsReversed(false);
  };

  const reverseGoods = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setVisibleGoods(goodsFromServer);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isReversed ? '' : 'is-light'}`}
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

        {visibleGoods.join() !== goodsFromServer.join() && (
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
          <li data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
