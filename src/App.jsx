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
  const [sortMode, setSortMode] = useState('none');
  const [reversed, setReversed] = useState(false);

  const displayedGoods = useMemo(() => {
    const arr = [...goodsFromServer];
    if (sortMode === 'alpha') {
      arr.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    } else if (sortMode === 'length') {
      arr.sort((a, b) => a.length - b.length || a.toLowerCase().localeCompare(b.toLowerCase()));
    }
    if (reversed) arr.reverse();
    return arr;
  }, [sortMode, reversed]);

  const isOriginalOrder = displayedGoods.length === goodsFromServer.length && displayedGoods.every((v, i) => v === goodsFromServer[i]);

  const handleSortAlpha = () => setSortMode('alpha');
  const handleSortLength = () => setSortMode('length');
  const handleReverse = () => setReversed(r => !r);
  const handleReset = () => {
    setSortMode('none');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortMode === 'alpha' ? '' : 'is-light'}`}
          onClick={handleSortAlpha}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortMode === 'length' ? '' : 'is-light'}`}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button type="button" className="button is-danger is-light" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map((g) => (
          <li data-cy="Good" key={g}>{g}</li>
        ))}
      </ul>
    </div>
  );
};
