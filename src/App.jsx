import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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
  const [isSortedAlphabetically, setIsSortedAlphabetically] = useState(false);
  const [isSortedByLength, setIsSortedByLength] = useState(false);
  const [isReversed, setIsReversed] = useState(false);

  let goodsList = [...goodsFromServer];

  if (isSortedAlphabetically) {
    goodsList.sort((a, b) => a.localeCompare(b));
  }

  if (isSortedByLength) {
    goodsList.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    goodsList.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isSortedAlphabetically ? '' : 'is-light'}`}
          onClick={() => {
            setIsSortedAlphabetically(true);
            setIsSortedByLength(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isSortedByLength ? '' : 'is-light'}`}
          onClick={() => {
            setIsSortedByLength(true);
            setIsSortedAlphabetically(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {(isSortedAlphabetically || isSortedByLength || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setIsSortedAlphabetically(false);
              setIsSortedByLength(false);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
