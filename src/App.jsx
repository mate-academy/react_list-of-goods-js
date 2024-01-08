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
  const [currentOrder, setCurrentOrder] = useState([...goodsFromServer]);
  const [isOriginalOrder, setIsOriginalOrder] = useState(true);

  const sortAlphabetically = () => {
    const newOrder = [...currentOrder].sort();

    setCurrentOrder(newOrder);
    setIsOriginalOrder(false);
  };

  const sortByLength = () => {
    const newOrder = [...currentOrder].sort((a, b) => a.length - b.length);

    setCurrentOrder(newOrder);
    setIsOriginalOrder(false);
  };

  const reverseOrder = () => {
    const newOrder = [...currentOrder].reverse();

    setCurrentOrder(newOrder);
    setIsOriginalOrder(!isOriginalOrder);
  };

  const resetOrder = () => {
    if (!isOriginalOrder) {
      setCurrentOrder([...goodsFromServer]);
      setIsOriginalOrder(true);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isOriginalOrder ? 'is-light' : ''}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isOriginalOrder ? 'is-light' : ''}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isOriginalOrder ? 'is-light' : ''}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger ${isOriginalOrder ? 'is-light' : ''}`}
          onClick={resetOrder}
        >
          Reset
        </button>
      </div>

      <ul>
        {currentOrder.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
