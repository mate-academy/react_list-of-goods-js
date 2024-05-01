import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

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
function getVisibleGoods(goods, sortType, reverse = false) {
  const sortedGoods = [...goods];

  switch (sortType) {
    case 'alphabetical':
      sortedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case 'length':
      sortedGoods.sort((a, b) => a.length - b.length);
      break;
    case 'reverse':
      sortedGoods.reverse();
      break;
    default:
      break;
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const handleRevers = () => {
    setIsReversed(!isReversed);
  };

  const handleSort = sortType => {
    setSortField(sortType);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortField('');
  };

  const visibleGoods = getVisibleGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info  ${sortField !== 'alphabetical' && 'is-light'}`}
          onClick={() => handleSort('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== 'length' && 'is-light'}`}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleRevers}
        >
          Reverse
        </button>

        {visibleGoods.join() !== goodsFromServer.join() && (
          <button type="button" className="button" onClick={handleReset}>
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
