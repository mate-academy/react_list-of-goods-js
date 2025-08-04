// App.jsx
import React, { useState, useMemo } from 'react';
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
  // 1) State: which sort, and reversed or not
  const [sortType, setSortType] = useState('default'); // "default" | "alphabet" | "length"
  const [isReversed, setIsReversed] = useState(false);

  // 2) Derive the list on every render
  const displayedGoods = useMemo(() => {
    const list = [...goodsFromServer];

    if (sortType === 'alphabet') {
      list.sort((a, b) => a.localeCompare(b));
    } else if (sortType === 'length') {
      list.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      list.reverse();
    }

    return list;
  }, [sortType, isReversed]);

  // 3) Handlers
  const handleSortAlpha = () => setSortType('alphabet');
  const handleSortLength = () => setSortType('length');
  const handleReverse = () => setIsReversed(r => !r);
  const handleReset = () => {
    setSortType('default');
    setIsReversed(false);
  };

  // 4) Are we back at the original order?
  const isOriginal = sortType === 'default' && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${sortType === 'alphabet' ? '' : ' is-light'}`}
          onClick={handleSortAlpha}
          data-cy="sort-alphabet"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${sortType === 'length' ? '' : ' is-light'}`}
          onClick={handleSortLength}
          data-cy="sort-length"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${isReversed ? '' : ' is-light'}`}
          onClick={handleReverse}
          data-cy="reverse"
        >
          Reverse
        </button>

        {/* only show Reset when we're no longer in the original order */}
        {!isOriginal && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
            data-cy="reset"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
