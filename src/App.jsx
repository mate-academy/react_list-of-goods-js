import React, { useState } from 'react';
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
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const getVisibleGoods = (goods, currentSortType, currentIsReversed) => {
    const goodsCopy = [...goods];

    if (currentSortType === 'alphabetical') {
      goodsCopy.sort((a, b) => a.localeCompare(b));
    } else if (currentSortType === 'byLength') {
      goodsCopy.sort((a, b) => a.length - b.length);
    }

    if (currentIsReversed) {
      goodsCopy.reverse();
    }

    return goodsCopy;
  };

  const visibleGoods = getVisibleGoods(goodsFromServer, sortType, isReversed);

  const resetOrder = () => {
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetical' ? '' : 'is-light'}`}
          onClick={() => setSortType('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'byLength' ? '' : 'is-light'}`}
          onClick={() => setSortType('byLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetOrder}
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
