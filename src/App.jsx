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
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleSortAlphabetically = () => {
    setSortType('alphabetical');
  };

  const handleSortByLength = () => {
    setSortType('length');
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  const isAlphabeticalActive = sortType === 'alphabetical';
  const isLengthActive = sortType === 'length';
  const isReverseActive = isReversed;
  const isOriginalOrder = sortType === null && !isReversed;

  const displayedGoods = [...goodsFromServer];

  if (sortType === 'alphabetical') {
    displayedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === 'length') {
    displayedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    displayedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isAlphabeticalActive ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isLengthActive ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverseActive ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
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
        {displayedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
