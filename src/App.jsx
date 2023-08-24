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
  const [originalOrder] = useState([...initialGoods]);
  const [isReversed, setIsReversed] = useState(false);

  const handleButtonClick = (buttonName) => {
    const newButtonStates = {
      sortAlphabetically: buttonName === 'sortAlphabetically',
      sortByLength: buttonName === 'sortByLength',
      reverse: buttonName === 'reverse',
      reset: buttonName === 'reset',
    };

    setButtonStates(newButtonStates);
  };

  const stableSort = (array, compareFunction) => array
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compareFunction(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);

  const sortAlphabetically = () => {
    const sortedGoods = stableSort([...goods], (a, b) => a.localeCompare(b));

    setGoods(sortedGoods);
    setAscending(true);
    handleButtonClick('sortAlphabetically');
    setIsReversed(false);
  };

  const sortByLengthStable = () => {
    const sortedGoods = stableSort([...goods], (a, b) => {
      if (a.length !== b.length) {
        return a.length - b.length;
      }

      return goods.indexOf(a) - goods.indexOf(b);
    });

    setGoods(sortedGoods);
    setAscending(true);
    handleButtonClick('sortByLength');
    setIsReversed(false);
  };

  const toggleReverseOrder = () => {
    const newGoods = isReversed ? [...originalOrder] : [...goods].reverse();

    setGoods(newGoods);
    setAscending(!ascending);
    handleButtonClick('reverse');
    setIsReversed(!isReversed);
  };

  const resetOrder = () => {
    setGoods([...originalOrder]);
    setAscending(true);
    handleButtonClick('reset');
    setIsReversed(false);
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
          onClick={toggleReverseOrder}
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
