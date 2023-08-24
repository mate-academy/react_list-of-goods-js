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
  const [sortAlphabeticallyLight, setSortAlphabeticallyLight] = useState(true);
  const [sortByLengthLight, setSortByLengthLight] = useState(true);
  const [reverseLight, setReverseLight] = useState(true);
  const [resetLight, setResetLight] = useState(true);
  const [ascending, setAscending] = useState(true);

  const sortAlphabetically = () => {
    const sortedGoods = [...goods].sort();

    setGoods(sortedGoods);
    setAscending(true);
    setSortAlphabeticallyLight(false);
    setSortByLengthLight(true);
    setReverseLight(true);
    setResetLight(true);
  };

  const sortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sortedGoods);
    setAscending(true);
    setSortAlphabeticallyLight(true);
    setSortByLengthLight(false);
    setReverseLight(true);
    setResetLight(true);
  };

  const reverseOrder = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setAscending(!ascending);
    setSortAlphabeticallyLight(true);
    setSortByLengthLight(true);
    setReverseLight(false);
    setResetLight(true);
  };

  const resetOrder = () => {
    setGoods(initialGoods);
    setAscending(true);
    setSortAlphabeticallyLight(true);
    setSortByLengthLight(true);
    setReverseLight(true);
    setResetLight(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortAlphabeticallyLight ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortByLengthLight ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseLight ? '' : 'is-light'}`}
          onClick={reverseOrder}
        >
          Reverse
        </button>

        <button
          type="button"
          className={`button is-danger ${resetLight ? '' : 'is-light'}`}
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
