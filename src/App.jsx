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

export const sortGoods = (goods, sortedBy, isReversed) => {
  const sortedGoods = [...goods];

  if (sortedBy === 'alphabetically') {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortedBy === 'by length') {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortedBy, setSortedBy] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleSort = sortType => {
    setSortedBy(sortType);
  };

  const handleReverse = () => {
    setIsReversed(prevIsReversed => !prevIsReversed);
  };

  const handleReset = () => {
    setSortedBy(null);
    setIsReversed(false);
  };

  const sortedGoods = sortGoods(goodsFromServer, sortedBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedBy === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => handleSort('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedBy === 'by length' ? '' : 'is-light'}`}
          onClick={() => handleSort('by length')}
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

        {sortedBy || isReversed ? (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : null}
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
