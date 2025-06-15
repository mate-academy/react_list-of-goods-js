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
  const [currentSortType, setCurrentSortType] = useState('initial'); // 'initial', 'alphabetical', 'length'
  const [isReversed, setIsReversed] = useState(false);

  // Helper function to sort alphabetically
  const sortAlphabetically = useCallback((arr) => {
    return [...arr].sort((a, b) => a.localeCompare(b));
  }, []);

  // Helper function to sort by length
  const sortByLength = useCallback((arr) => {
    return [...arr].sort((a, b) => a.length - b.length);
  }, []);

  // Handler for sorting alphabetically
  const handleSortAlphabetically = useCallback(() => {
    let newGoods = [...goods]; // Start with the current goods

    if (currentSortType === 'alphabetical' && !isReversed) {
      // If already sorted alphabetically and not reversed, do nothing or reset to initial
      // Based on the requirement "remove is-light class from the button when this order is applied;"
      // implies that clicking again on the active sort might re-apply or do nothing.
      // For chaining, it's better to just ensure it's sorted alphabetically.
      newGoods = sortAlphabetically(newGoods);
    } else {
      newGoods = sortAlphabetically(newGoods);
    }

    setGoods(newGoods);
    setCurrentSortType('alphabetical');
    setIsReversed(false); // Reset reverse when a new sort type is applied
  }, [goods, currentSortType, isReversed, sortAlphabetically]);

  // Handler for sorting by length
  const handleSortByLength = useCallback(() => {
    let newGoods = [...goods]; // Start with the current goods

    if (currentSortType === 'length' && !isReversed) {
      newGoods = sortByLength(newGoods);
    } else {
      newGoods = sortByLength(newGoods);
    }

    setGoods(newGoods);
    setCurrentSortType('length');
    setIsReversed(false); // Reset reverse when a new sort type is applied
  }, [goods, currentSortType, isReversed, sortByLength]);

  // Handler for reversing the current order
  const handleReverse = useCallback(() => {
    // Reverse the current goods array
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prev => !prev); // Toggle the reverse state
    setCurrentSortType('reversed'); // Indicate that it's reversed, regardless of previous sort type
  }, []);

  // Handler for resetting to the initial order
  const handleReset = useCallback(() => {
    setGoods(goodsFromServer);
    setCurrentSortType('initial');
    setIsReversed(false);
  }, []);

  // Determine if the "Reset" button should be visible
  const isResetVisible = useMemo(() => {
    // Check if the current `goods` array is different from `goodsFromServer`
    return (
      JSON.stringify(goods) !== JSON.stringify(goodsFromServer) || isReversed
    );
  }, [goods, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${currentSortType === 'alphabetical' && !isReversed ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${currentSortType === 'length' && !isReversed ? '' : 'is-light'}`}
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
