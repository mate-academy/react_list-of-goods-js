import { useState } from 'react';
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

function getPrepareGoods(goods, { sortByAlphabet, reverse, sortByLength }) {
  const preparedGoods = [...goods];

  if (sortByAlphabet) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortByLength) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortByAlphabet, setSortByAlphabet] = useState(false);
  const [sortByLength, setSortByLength] = useState(false);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPrepareGoods(goodsFromServer, {
    sortByAlphabet,
    sortByLength,
    reverse,
  });

  const handleSort = setField => {
    setField(prev => !prev);
  };

  const isSorted = sortByAlphabet || sortByLength || reverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortByAlphabet ? '' : 'is-light'}`}
          onClick={() => handleSort(setSortByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortByLength ? '' : 'is-light'}`}
          onClick={() => handleSort(setSortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${reverse ? '' : 'is-light'}`}
          onClick={() => handleSort(setReverse)}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortByAlphabet(false);
              setSortByLength(false);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
