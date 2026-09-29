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
  const [sortOption, setSortOption] = useState(null);
  const [isReverse, setIsReverse] = useState(false);
  const goods = [...goodsFromServer];

  const reset = () => {
    setIsReverse(false);
    setSortOption(null);
  };

  if (sortOption === 'Alphabet') {
    goods.sort((a, b) => a.localeCompare(b));
  }

  if (sortOption === 'Length') {
    goods.sort((a, b) => a.length - b.length);
  }

  if (isReverse) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOption !== 'Alphabet' && 'is-light'}`}
          onClick={() => setSortOption('Alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOption !== 'Length' && 'is-light'}`}
          onClick={() => setSortOption('Length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReverse && 'is-light'}`}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(isReverse || sortOption) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
