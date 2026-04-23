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
  const [sortBy, setSortBy] = useState('none');
  const [isReversed, setIsReversed] = useState(false);

  const displayedGoods = [...goodsFromServer];

  if (sortBy === 'alphabetical') {
    displayedGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === 'length') {
    displayedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    displayedGoods.reverse();
  }

  const isModified = sortBy !== 'none' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== 'alphabetical' ? 'is-light' : ''}`}
          onClick={() => setSortBy('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== 'length' ? 'is-light' : ''}`}
          onClick={() => setSortBy('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('none');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
