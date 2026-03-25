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
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = [...goodsFromServer];

  if (sortType === 'alpha') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === 'length') {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType('alpha')}
          type="button"
          className={`button is-info ${sortType === 'alpha' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType('length')}
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}>
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}>
          Reverse
        </button>


        {(sortType !== '' || isReversed) && (
  <button
          onClick={() => {
            setSortType('');
            setIsReversed(false);
          }}
          type="button"
          className={`button is-danger $`}
        >
          Reset
        </button>
        )}

      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
