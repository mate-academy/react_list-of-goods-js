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

const SORT_LENGTH = 'length';
const SORT_ALPHABETICALLY = 'alphabetically';

const getSortedGood = (goods, sort, reverse) => {
  const newGoods = [...goods];

  if (sort) {
    newGoods.sort((goodOne, goodTwo) => {
      switch (sort) {
        case 'length':
          return goodOne.length - goodTwo.length;
        case 'alphabetically':
          return goodOne.localeCompare(goodTwo);
        default:
          return 0;
      }
    });
  }

  return reverse ? newGoods.reverse() : newGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [reverse, setReverse] = useState(false);
  const updatedGoods = getSortedGood(goodsFromServer, sortBy, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === SORT_ALPHABETICALLY ? '' : 'is-light'}`}
          onClick={() => setSortBy(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === SORT_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortBy(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(sortBy || reverse) && (
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
        {updatedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
