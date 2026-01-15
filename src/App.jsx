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
  const [sortBy, setSortBy] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const isAlphaActive = sortBy === 'alpha';
  const isLengthActive = sortBy === 'length';
  const isOriginalOrder = sortBy === null && !isReversed;

  const visibleGoods = [...goodsFromServer];

  if (isAlphaActive) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (isLengthActive) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) visibleGoods.reverse();

  const handleSortAlpha = () => setSortBy('alpha');
  const handleSortLength = () => setSortBy('length');
  const handleReverse = () => setIsReversed(prev => !prev);
  const handleReset = () => {
    setSortBy(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isAlphaActive ? '' : 'is-light'}`}
          onClick={handleSortAlpha}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isLengthActive ? '' : 'is-light'}`}
          onClick={handleSortLength}
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

        {!isOriginalOrder && (
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
