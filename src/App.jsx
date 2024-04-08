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

function sortArray(array, method) {
  const newArray = [...array];

  switch (method) {
    case 'alphabetically':
      return newArray.sort((good1, good2) => good1.localeCompare(good2));
    case 'length':
      return newArray.sort((good1, good2) => good1.length - good2.length);
    default:
      return newArray;
  }
}

function reverseArray(array, method) {

  array.reverse();

  return array;
}

export function App() {
  const [goodValue, setGoodValue] = useState([...goodsFromServer]);
  const [activeMethod, setActiveMethod] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortMethods = method => {
    const sortedGoods = sortArray(goodValue, method);

    setGoodValue(sortedGoods);
    setActiveMethod(method);
  };

  const reverseArr = method => {
    const reversArr = reverseArray(isReversed, method);

    setIsReversed(reversArr);
    setActiveMethod(method);
  };

  const resetSort = () => {
    setGoodValue([...goodsFromServer]);
    setActiveMethod(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeMethod === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => sortMethods('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeMethod === 'length' ? '' : 'is-light'}`}
          onClick={() => sortMethods('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeMethod === 'reverse' ? '' : 'is-light'}`}
          onClick={() => reverseArr('reverse')}
        >
          Reverse
        </button>

        {activeMethod && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodValue.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
}
