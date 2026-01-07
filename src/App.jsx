import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [direction, setDirection] = useState('asc');

  function handleSort(type) {
    setSortType(type);
  }

  function handleReverse() {
    setDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  }

  function handleReset() {
    setSortType(null);
    setDirection('asc');
  }

  const visibleGoods = [...goodsFromServer];

  if (sortType === SORT_BY_ALPHABET) {
    visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortType === SORT_BY_LENGTH) {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (direction === 'desc') {
    visibleGoods.reverse();
  }

  const isChanged = sortType !== null || direction !== 'asc';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== SORT_BY_ALPHABET,
          })}
          onClick={() => handleSort(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType !== SORT_BY_LENGTH,
          })}
          onClick={() => handleSort(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': direction !== 'desc',
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
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
