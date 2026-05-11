import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useMemo } from 'react';

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
  const [sortOrder, setSortOrder] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  // Function to get sorted goods based on current settings
  const getSortedGoods = () => {
    let sorted = [...goodsFromServer];

    if (sortOrder === 'alphabetical') {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (sortOrder === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const sortedGoods = useMemo(getSortedGoods, [sortOrder, isReversed]);

  const isOriginalOrder = () => {
    return sortOrder === null && isReversed === false;
  };

  const handleSortAlphabetical = () => {
    setSortOrder('alphabetical');
    // Don't reset isReversed - reverse should work together with sorting
  };

  const handleSortByLength = () => {
    setSortOrder('length');
    // Don't reset isReversed - reverse should work together with sorting
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortOrder(null);
    setIsReversed(false);
  };

  const isOriginal = isOriginalOrder();

  // Determine if buttons should have is-light class
  const isSortAlphabeticalActive = sortOrder === 'alphabetical';
  const isSortByLengthActive = sortOrder === 'length';
  const isReverseActive = isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!isSortAlphabeticalActive ? 'is-light' : ''}`}
          onClick={handleSortAlphabetical}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${!isSortByLengthActive ? 'is-light' : ''}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReverseActive ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginal && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
