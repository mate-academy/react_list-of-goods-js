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

function sortByAlphabetically(copyAlphabeticallyArray) {
  const sortAlphabeticallyArray = [...copyAlphabeticallyArray];

  return sortAlphabeticallyArray.sort((good1, good2) =>
    good1.localeCompare(good2),
  );
}

function sortByLength(copyLengthArray) {
  const sortLengthArray = [...copyLengthArray];

  return sortLengthArray.sort((good1, good2) => good1.length - good2.length);
}

function reverseCopyArray(copyReverseArray) {
  const arrayReverse = [...copyReverseArray];

  return arrayReverse.reverse();
}

export function App() {
  const [goodValue, setGoodValue] = useState([...goodsFromServer]);
  const [flag, setFlag] = useState(false);
  const [activeMethod, setActiveMethod] = useState(null);

  const sortAlphabetically = () => {
    const sortedGoods = sortByAlphabetically(goodValue);

    setGoodValue(sortedGoods);
    setActiveMethod('alphabetically');
    setFlag(true);
  };

  const sortLength = () => {
    const sortedGoods = sortByLength(goodValue);

    setGoodValue(sortedGoods);
    setActiveMethod('length');
    setFlag(true);
  };

  const reverseArr = () => {
    const reverseArray = reverseCopyArray(goodValue);

    setGoodValue(reverseArray);
    setActiveMethod('reverse');
    setFlag(true);
  };

  const resetOrder = () => {
    setGoodValue([...goodsFromServer]);
    setActiveMethod(null);
    setFlag(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeMethod === 'alphabetical' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeMethod === 'length' ? '' : 'is-light'}`}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeMethod === 'reverse' ? '' : 'is-light'}`}
          onClick={reverseArr}
        >
          Reverse
        </button>

        {flag && (
          <button
            type="button"
            className={`button is-danger ${activeMethod === null ? '' : 'is-light'}`}
            onClick={resetOrder}
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
