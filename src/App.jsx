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
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const getSortedGoods = () => {
    const sortedGoods = [...goodsFromServer];

    if (sortField === 'Sort alphabetically') {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    } else if (sortField === 'Sort by length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const visibleGoods = getSortedGoods();

  const isOriginalOrder = sortField === '' && !isReversed; // Determine if in original order

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === 'Sort alphabetically'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField('Sort alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === 'Sort by length'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField('Sort by length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-info is-light'
          }
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
