import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const goodsFromServer = [
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

const generateKey = () => {
  return `_${Math.random().toString(36).substr(2, 9)}`;
};

const getVisibleGoods = (goods, sortValue, isReversed) => {
  const visibleGoods = [...goods];

  if (sortValue === 'alphabetically') {
    visibleGoods.sort();
  } else if (sortValue === 'by length') {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
};

export const App = () => {
  const [sortValue, setSortValue] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const [, forceUpdate] = useState(0);

  const visibleGoods = getVisibleGoods(goodsFromServer, sortValue, isReversed);

  const sortAlphabetically = () => {
    setSortValue('alphabetically');
    setIsReversed(false);
  };

  const sortByLength = () => {
    setSortValue('by length');
    setIsReversed(false);
  };

  const reverseOrder = () => {
    setIsReversed(!isReversed);
  };

  const resetOrder = () => {
    setSortValue('');
    setIsReversed(false);
    forceUpdate(prevKey => prevKey + 1);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortValue === 'alphabetically' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortValue === 'by length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        {(sortValue || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetOrder}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={generateKey()} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
