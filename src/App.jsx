import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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
const sortButtons = [
  { id: 'alphabet', label: 'Sort alphabetically', color: 'is-info' },
  { id: 'length', label: 'Sort by length', color: 'is-success' },
];

export const App = () => {
  const [sortField, setSortField] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  function getVisibleGoods() {
    const goods = [...goodsFromServer];

    if (sortField === 'alphabet') {
      goods.sort((a, b) => a.localeCompare(b));
    }

    if (sortField === 'length') {
      goods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  }

  const visibleGoods = getVisibleGoods();

  const handleSort = field => {
    setSortField(field);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortField(null);
    setIsReversed(false);
  };

  const isResetVisible = sortField !== null || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        {sortButtons.map(({ id, label, color }) => (
          <button
            key={id}
            type="button"
            className={cn('button', color, {
              'is-light': sortField !== id,
            })}
            onClick={() => handleSort(id)}
          >
            {label}
          </button>
        ))}

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
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
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
