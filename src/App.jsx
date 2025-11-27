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
  const [sortMode, setSortMode] = useState(null);
  const visible = [...goodsFromServer];

  const [reversed, setReversed] = useState(false);

  const handleAlphabet = () => setSortMode('alphabet');
  const handleLength = () => setSortMode('length');
  const handleReset = () => {
    setSortMode(null);
    setReversed(false);
  };

  if (sortMode === 'alphabet') visible.sort((a, b) => a.localeCompare(b));
  if (sortMode === 'length') visible.sort((a, b) => a.length - b.length);
  if (reversed) visible.reverse();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={handleAlphabet}
          className={`button ${sortMode === 'alphabet' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={handleLength}
          className={`button ${sortMode === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={`button ${reversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {(sortMode !== null || reversed) && (
          <button type="button" onClick={handleReset} className="button">
            Reset
          </button>
        )}
      </div>

      <ul>
        {visible.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
