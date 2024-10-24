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

const prepareGoods = (goods, { field, isReverse }) => {
  const sortedGoods = [...goods];

  if (field === 'alphabetical') {
    sortedGoods.sort();
  } else if (field === 'length') {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [sortField, setSortField] = useState(null);
  const [originalGoods] = useState(goodsFromServer);

  const handleSortByName = () => {
    setSortField('alphabetical');
    setVisibleGoods(
      prepareGoods(goodsFromServer, {
        field: 'alphabetical',
        isReverse: isReversed,
      }),
    );
  };

  const handleSortByLength = () => {
    setSortField('length');
    setVisibleGoods(
      prepareGoods(goodsFromServer, { field: 'length', isReverse: isReversed }),
    );
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
    setVisibleGoods(
      prepareGoods(goodsFromServer, {
        field: sortField,
        isReverse: !isReversed,
      }),
    );
  };

  const handleReset = () => {
    setVisibleGoods(originalGoods);
    setSortField(null);
    setIsReversed(false);
  };

  const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    return arr1.every((value, index) => value === arr2[index]);
  };

  const showResetButton = !arraysEqual(visibleGoods, originalGoods);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'alphabetical' ? '' : 'is-light'}`}
          onClick={handleSortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField === 'length' ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {showResetButton && (
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
