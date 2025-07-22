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
  const [sortMode, setSortMode] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const updateGoods = (mode, reversed = isReversed) => {
    const sortedGoods = [...goodsFromServer];

    if (mode === 'alphabetical') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (mode === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      sortedGoods.reverse();
    }

    setVisibleGoods(sortedGoods);
  };

  const handleSortAlphabetically = () => {
    setSortMode('alphabetical');
    updateGoods('alphabetical', isReversed);
  };

  const handleSortByLength = () => {
    setSortMode('length');
    updateGoods('length', isReversed);
  };

  const handleReverse = () => {
    const newIsReversed = !isReversed;

    setIsReversed(newIsReversed);
    updateGoods(sortMode, newIsReversed);
  };

  const handleReset = () => {
    setSortMode(null);
    setIsReversed(false);
    setVisibleGoods(goodsFromServer);
  };

  const isModified = sortMode !== null || isReversed !== false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortMode !== 'alphabetical' ? 'is-light' : ''}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortMode !== 'length' ? 'is-light' : ''}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
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
