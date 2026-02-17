import { useMemo, useState } from 'react';
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
  const [sortBy, setSortBy] = useState(null); // 'alpha' | 'length' | null
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    const result = [...goodsFromServer];

    if (sortBy === 'alpha') {
      result.sort((a, b) => a.localeCompare(b));
    }

    if (sortBy === 'length') {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [sortBy, isReversed]);

  const isInitialOrder = sortBy === null && isReversed === false;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === 'alpha' ? '' : 'is-light'}`}
          onClick={() => setSortBy('alpha')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortBy('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortBy(null);
              setIsReversed(false);
            }}
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
