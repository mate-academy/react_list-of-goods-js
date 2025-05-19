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
  const [sortBy, setSortBy] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = () => {
    const result = [...goodsFromServer];

    if (sortBy === 'alphabet') {
      result.sort((a, b) => a.localeCompare(b));
    } else if (sortBy === 'length') {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  const handleSort = method => {
    setSortBy(current => {
      if (current === method) {
        setIsReversed(false);

        return null;
      }

      return method;
    });
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortBy(null);
    setIsReversed(false);
  };

  const displayedGoods = getSortedGoods();

  const isResetVisible = sortBy !== null || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => handleSort('alphabet')}
          className={`button ${sortBy === 'alphabet' ? 'is-info' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => handleSort('length')}
          className={`button ${sortBy === 'length' ? 'is-success' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={`button ${isReversed ? 'is-warning' : 'is-light'}`}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger"
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
