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
  const [originalGoods] = useState(goodsFromServer);
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortMode, setSortMode] = useState('default');
  const [isReversed, setIsReversed] = useState(false);
  const handleReset = () => {
    setVisibleGoods(originalGoods);
    setIsReversed(false);
    setSortMode('default');
  };

  const handleReverse = () => {
    setVisibleGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const sortedByLength = () => {
    const sortedLength = [...originalGoods].sort((a, b) => a.length - b.length);

    if (isReversed === true) {
      sortedLength.reverse();
    }

    setVisibleGoods(sortedLength);
    setSortMode('length');
  };

  const sortedAlphabetically = () => {
    const sorted = [...originalGoods].sort((a, b) => a.localeCompare(b));

    if (isReversed === true) {
      sorted.reverse();
    }

    setVisibleGoods(sorted);
    setSortMode('alpha');
  };

  const isChanged =
    JSON.stringify(visibleGoods) !== JSON.stringify(originalGoods);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortedAlphabetically}
          type="button"
          className={`button is-info ${sortMode === 'alpha' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortedByLength}
          type="button"
          className={`button is-success ${sortMode === 'length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            onClick={handleReset}
            type="button"
            className={`button is-danger ${isChanged ? '' : 'is-light'}`}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
