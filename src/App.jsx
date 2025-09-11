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
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleSortAlphabetically = () => setSortType('alphabet');
  const handleSortByLength = () => setSortType('length');
  const handleReverse = () => setIsReversed(prev => !prev);
  const handleReset = () => {
    setSortType('');
    setIsReversed(false);
  };

  // обчислюємо список на льоту
  let displayedGoods = [...goodsFromServer];

  if (sortType === 'alphabet') {
    displayedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === 'length') {
    displayedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    displayedGoods.reverse();
  }

  const isInitialOrder =
    sortType === '' && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-light"
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
