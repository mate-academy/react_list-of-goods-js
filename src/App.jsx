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
  const [sortField, setSortField] = useState('none');
  const [isReversed, setIsReversed] = useState(false);
  const prepared = [...goodsFromServer];

  if (sortField === 'alpha') {
    prepared.sort((a, b) => a.localeCompare(b));
  } else if (sortField === 'length') {
    prepared.sort((a, b) => a.length - b.length || a.localeCompare(b));
  }

  if (isReversed) {
    prepared.reverse();
  }

  const handleSortAlpha = () => {
    setSortField('alpha');
  };

  const handleSortLength = () => {
    setSortField('length');
  };

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const resetList = () => {
    setSortField('none');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== 'alpha' ? 'is-light' : ''}`}
          onClick={handleSortAlpha}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== 'length' ? 'is-light' : ''}`}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {sortField !== 'none' || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetList}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {prepared.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
