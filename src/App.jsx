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

const prepareGoodsList = (goods, sortOrder, isReversed) => {
  let sortedGoods = [...goods];

  if (sortOrder === 'alphabetically') {
    sortedGoods.sort();
  } else if (sortOrder === 'length') {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App = () => {
  const [sortOrder, setSortOrder] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const goodsToRender = prepareGoodsList(goodsFromServer, sortOrder, isReversed);

  const sortAlphabetically = () => {
    setSortOrder('alphabetically');
  };
  const sortByLength = () => {
    setSortOrder('length');
  };

  const reverseOrder = () => {
    setIsReversed((prev) => !prev);
  };

  const resetOrder = () => {
    setSortOrder('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortOrder === 'alphabetically' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortOrder === 'length' ? '' : 'is-light'}`}
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

        {(sortOrder || isReversed) && (
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
        {goodsToRender.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
