import { useState } from 'react';
import cn from 'classnames';
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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = [...goodsFromServer];

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  function handleSortByName() {
    setSortField(SORT_FIELD_NAME);
    setIsReversed(false);
  }

  function handleSortByLength() {
    setSortField(SORT_FIELD_LENGTH);
    setIsReversed(false);
  }

  function handleReverse() {
    setIsReversed(prev => !prev);
  }

  if (sortField === SORT_FIELD_NAME) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortField === SORT_FIELD_LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isOriginal = visibleGoods.every((g, i) => g === goodsFromServer[i]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortByName}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={handleReverse}
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {!isOriginal && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger"
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
