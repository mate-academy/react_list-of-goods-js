import React, {useState, useMemo} from 'react';
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

const INITIAL_GOODS = goodsFromServer;

export const App = () => {
  const [sortKey, setSortKey] = useState('initial');

  const [isReversed, setIsReversed] = useState(false);

  const displayedGoods = useMemo(() => {
    let newGoods = [...INITIAL_GOODS];
    if (sortKey === 'alpha') {
      newGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortKey === 'length') {
      newGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      newGoods.reverse();
    }
     return newGoods;
  }, [sortKey, isReversed]);

const isModified = sortKey !== 'initial' || isReversed;

  // Handler for sorting buttons (Alphabetical and Length)
  const handleSort = (key) => {
    setSortKey(key);
    // When a new sort is applied, reset the reversal status
    
  };

  // Handler for the Reverse button
  const handleReverse = () => {
    // Toggles the reversal status
    setIsReversed(prev => !prev);
    // If the goods were in 'initial' order, they now become 'initial' and reversed.
  };

  // Handler for the Reset button
  const handleReset = () => {
    setSortKey('initial');
    setIsReversed(false);
  };

  // Helper to dynamically set classes for sorting buttons
  const getSortClass = (key) => {
    // The active button (matching sortKey) does not get 'is-light'
    const lightClass = sortKey === key ? '' : 'is-light';
    let colorClass = '';

    if (key === 'alpha') {
        colorClass = 'is-info';
    } else if (key === 'length') {
        colorClass = 'is-success';
    }

    return `button ${colorClass} ${lightClass}`;
  };

  // Helper to dynamically set classes for the Reverse button
  const getReverseClass = () => {
    // If reversed, remove 'is-light'
    return `button is-warning ${isReversed ? '' : 'is-light'}`;
  };

  return (
   <div className="section content">
      <h1 className="title is-4">Goods List Sorter</h1>
      <div className="buttons">
        <button
          type="button"
          className={getSortClass('alpha')}
          onClick={() => handleSort('alpha')}
          data-cy="SortAlphabeticalButton"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={getSortClass('length')}
          onClick={() => handleSort('length')}
          data-cy="SortLengthButton"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={getReverseClass()}
          onClick={handleReverse}
          data-cy="ReverseButton"
        >
          Reverse
        </button>

        
        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
            data-cy="ResetButton"
          >
            Reset
          </button>
        )}
      </div>

      <ul className="box p-4">
        {displayedGoods.map((good) => (
          <li key={good} data-cy="Good" className="py-1">
            {good}
          </li>
        ))}
      </ul>
      <p className="has-text-grey-light is-size-7 mt-5">
        Current Order: **{sortKey.charAt(0).toUpperCase() + sortKey.slice(1)}** {isReversed ? '(Reversed)' : ''}
      </p>
    </div>
);
};

export default App;
