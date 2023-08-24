/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const initialGoods = [
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
  const [goods, setGoods] = useState(initialGoods);
  const [buttonStates, setButtonStates] = useState({
    sortAlphabetically: true,
    sortByLength: true,
    reverse: true,
    reset: true,
  });
  const [ascending, setAscending] = useState(true);
  const [originalOrder] = useState([...initialGoods]); // Store the original order during component initialization

  const handleButtonClick = (buttonName) => {
    const newButtonStates = { ...buttonStates };

    Object.keys(newButtonStates).forEach((key) => {
      newButtonStates[key] = key === buttonName;
    });
    setButtonStates(newButtonStates);
  };

  const sortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    setGoods(sortedGoods);
    setAscending(true);
    handleButtonClick('sortAlphabetically');
  };

  const sortByLengthStable = () => {
    const sortedGoods = [...goods].sort((a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length;
      }

      return goods.indexOf(a) - goods.indexOf(b);
    });

    setGoods(sortedGoods);
    setAscending(true);
    handleButtonClick('sortByLength');
  };

  const reverseOrder = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setAscending(!ascending);
    handleButtonClick('reverse');
  };

  const resetOrder = () => {
    setGoods(originalOrder);
    setAscending(true);
    handleButtonClick('reset');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${buttonStates.sortAlphabetically ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${buttonStates.sortByLength ? '' : 'is-light'}`}
          onClick={sortByLengthStable}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${buttonStates.reverse ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger ${buttonStates.reset ? '' : 'is-light'}`}
          onClick={resetOrder}
        >
          Reset
        </button>
      </div>

      <ul>
        {goods.map((good, index) => (
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
