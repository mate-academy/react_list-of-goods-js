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

function preparedGoods(goods, { sortedByAlphabet, reversed, sortedByLength }) {
  const sortedGoods = [...goods];

  if (sortedByAlphabet) {
    sortedGoods.sort();
  }

  if (sortedByLength) {
    sortedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortedByAlphabet, setSortedAlphabet] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [sortedByLength, setSortedByLength] = useState(false);

  const visibleGoods = preparedGoods(goodsFromServer, {
    sortedByAlphabet,
    reversed,
    sortedByLength,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${sortedByAlphabet ? '' : ' is-light'}`}
          onClick={() => {
            setSortedAlphabet(true);
            setSortedByLength(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-warning${sortedByLength ? '' : ' is-light'}`}
          onClick={() => {
            setSortedAlphabet(false);
            setSortedByLength(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-success${reversed ? '' : ' is-light'}`}
          onClick={() => {
            setReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {(sortedByLength || reversed || sortedByAlphabet) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortedAlphabet(false);
              setSortedByLength(false);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
