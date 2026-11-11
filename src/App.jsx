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

  if (sortType === 'alphabetically') {
    visibleGoods.sort((good1, good2) =>
      good1.localeCompare(good2),
    );
  }

  if (sortType === 'length') {
    visibleGoods.sort((good1, good2) =>
      good1.length - good2.length,
    );
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={() => setSortType('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
        >
          Reset
        </button>
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
