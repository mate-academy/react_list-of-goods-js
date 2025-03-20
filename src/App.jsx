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

const SORT_ORIGINAL = 'original';
const SORT_ALPHABETICALLY = 'alphabetical';
const SORT_LENGTH = 'length';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortOrder, setSortOrder] = useState(SORT_ORIGINAL);
  const [isReversed, setIsReversed] = useState(false);

  const applySorting = (sortedGoods, order) => {
    setVisibleGoods(isReversed ? [...sortedGoods].reverse() : sortedGoods);
    setSortOrder(order);
  };

  const sortGoodsAlphabetically = () => {
    applySorting(
      [...visibleGoods].sort((good1, good2) => good1.localeCompare(good2)),
      SORT_ALPHABETICALLY,
    );
  };

  const sortGoodsByLength = () => {
    const sortedGoods = [...goodsFromServer].sort(
      (good1, good2) => good1.length - good2.length,
    );

    applySorting(sortedGoods, SORT_LENGTH);
  };

  const reverseGoods = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setVisibleGoods(goodsFromServer);
    setSortOrder(SORT_ORIGINAL);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === SORT_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={sortGoodsAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === SORT_LENGTH ? '' : 'is-light'}`}
          onClick={sortGoodsByLength}
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

        {sortOrder !== SORT_ORIGINAL || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        ) : null}
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
