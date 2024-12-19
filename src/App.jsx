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

function applySort(arr, sortingType, reversed) {
  const sortedArray = [...arr];

  switch (sortingType) {
    case 'alphabet':
      sortedArray.sort((a, b) => a.localeCompare(b));
      break;
    case 'length': {
      sortedArray.sort((a, b) => a.length - b.length);
      break;
    }

    default:
      break;
  }

  if (reversed) {
    sortedArray.reverse();
  }

  return sortedArray;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortGoods = applySort(goodsFromServer, sortType, isReversed);
  const shouldShowReset = sortType || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== 'alphabet',
          })}
          onClick={() => setSortType('alphabet')}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType !== 'length',
          })}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={cn('button', 'is-info', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>
        <button
          type="button"
          className={cn('button', 'is-danger', { 'is-light': true })}
          onClick={() => {
            setSortType('');
            setIsReversed(false);
          }}
          disabled={!shouldShowReset}
        >
          Reset
        </button>
      </div>
      <ul>
        {sortGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
