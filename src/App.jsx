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

const SORT_ALPHABETICAL = 'alphabetical';
const SORT_LENGTH = 'length';

const getSortedGoods = (goods, sortType) => {
  switch (sortType) {
    case SORT_ALPHABETICAL:
      return [...goods].sort((a, b) => a.localeCompare(b));
    case SORT_LENGTH:
      return [...goods].sort((a, b) => a.length - b.length);
    default:
      return [...goods];
  }
};

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  let goods = getSortedGoods(goodsFromServer, sortType);

  if (isReversed) goods = [...goods].reverse();

  const isOriginalOrder = sortType === '' && !isReversed;

  const handleSort = type => {
    if (sortType === type && !isReversed) return;
    setSortType(type);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => handleSort(SORT_ALPHABETICAL)}
          type="button"
          className={`button is-info${sortType === SORT_ALPHABETICAL ? '' : ' is-light'}`}
        >
          Sort alphabetically
        </button>
        <button
          onClick={() => handleSort(SORT_LENGTH)}
          type="button"
          className={`button is-success${sortType === SORT_LENGTH ? '' : ' is-light'}`}
        >
          Sort by length
        </button>
        <button
          onClick={handleReverse}
          type="button"
          className={`button is-warning${isReversed ? '' : ' is-light'}`}
        >
          Reverse
        </button>
        {!isOriginalOrder && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
