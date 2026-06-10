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
  const isChanged = sortType !== '' || isReversed;
  const visibleItems = [...goodsFromServer];

  if (sortType === 'alphabet') {
    visibleItems.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === 'length') {
    visibleItems.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    visibleItems.reverse();
  }

  function handleReset() {
    setSortType('');
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType('alphabet')}
          type="button"
          className={
            sortType === 'alphabet'
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType('length')}
          type="button"
          className={
            sortType === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(currentValue => !currentValue)}
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {isChanged && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleItems.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
