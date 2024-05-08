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

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortStatus, setSortStatus] = useState('unordered');
  const [isReversed, setIsReversed] = useState(false);
  const isReseted = sortStatus === 'unordered' && !isReversed;

  const sortAlphabetically = () => {
    const sortedGoods = [...visibleGoods].sort((good1, good2) =>
      good1.localeCompare(good2),
    );

    if (isReversed) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
    setSortStatus('alpha');
  };

  const sortByLength = () => {
    const sortedGoods = [...goodsFromServer].sort(
      (good1, good2) => good1.length - good2.length,
    );

    if (isReversed) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
    setSortStatus('length');
  };

  const reverseGoods = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setVisibleGoods(goodsFromServer);
    setSortStatus('unordered');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={`button is-info ${sortStatus === 'alpha' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortStatus === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGoods}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>
        {!isReseted && (
          <button
            onClick={resetGoods}
            type="button"
            className="button is-danger is-light"
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
