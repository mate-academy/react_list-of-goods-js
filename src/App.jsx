import React, { useState, useMemo, useCallback } from 'react';
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
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortOrder, setSortOrder] = useState('initial'); // 'initial', 'alphabetical', 'length'
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = useMemo(() => {
    const currentGoods = [...goods];

    if (sortOrder === 'alphabetical') {
      currentGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortOrder === 'length') {
      currentGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      currentGoods.reverse();
    }

    return currentGoods;
  }, [goods, sortOrder, isReversed]);

  const handleSortAlphabetically = useCallback(() => {
    setGoods(goodsFromServer); // Reset to original for consistent sorting base
    setSortOrder('alphabetical');
    setIsReversed(false);
  }, []);

  const handleSortByLength = useCallback(() => {
    setGoods(goodsFromServer); // Reset to original for consistent sorting base
    setSortOrder('length');
    setIsReversed(false);
  }, []);

  const handleReverse = useCallback(() => {
    setIsReversed(prev => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setGoods(goodsFromServer);
    setSortOrder('initial');
    setIsReversed(false);
  }, []);

  // Determine if the "Reset" button should be visible
  const isResetVisible = useMemo(() => {
    return sortOrder !== 'initial' || isReversed;
  }, [goods, sortOrder, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === 'alphabetical' && !isReversed ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === 'length' && !isReversed ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
