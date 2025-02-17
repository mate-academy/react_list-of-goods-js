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

export const GoodsList = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};

export function isSameArray(arr1, arr2) {
  return (
    arr1.length === arr2.length && arr1.every((val, idx) => val === arr2[idx])
  );
}

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [reverse, setReverse] = useState(false);

  const sortGood = [...goodsFromServer];
  let showReset = false;

  if (sortBy) {
    sortGood.sort((good1, good2) => {
      if (sortBy === 'alphabetically') {
        return good1.localeCompare(good2);
      }

      if (sortBy === 'Length') {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  // Check if sorting or reversing has changed the order
  showReset = !isSameArray(sortGood, goodsFromServer);

  // Function to check if two arrays are identical

  if (reverse) {
    sortGood.reverse();
    showReset = !isSameArray(sortGood, goodsFromServer);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortBy === 'alphabetically'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortBy('alphabetically');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortBy === 'Length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            setSortBy('Length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reverse ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>
        {showReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <GoodsList goods={sortGood} />
      </ul>
    </div>
  );
};
