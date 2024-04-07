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
    case 'reverse':
      return newArray.reverse();
    default:
      return newArray;
  }
}

export function App() {
  const [goodValue, setGoodValue] = useState([...goodsFromServer]);
  const [activeMethod, setActiveMethod] = useState(null);

  const sortMethods = method => {
    const sortedGoods = sortArray(goodValue, method);

    setGoodValue(sortedGoods);
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
          onClick={() => sortMethods('reverse')}
        >
          Reverse
        </button>

        {activeMethod && (
          <button
            type="button"
            className="button is-danger"
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
