import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useEffect } from 'react';

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

function arraysAreEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i+=1) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

function sortAlphabetique(goods) {
  return [...goods].sort((a, b) => a.localeCompare(b));
}

function sortLength(goods) {
  return [...goods].sort((a, b) => a.length - b.length);
}

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [reversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(null);

  useEffect(() => {
    let sortedGoods = [...goodsFromServer];

    if (sortType === 'alphabet') {
      sortedGoods = sortAlphabetique(sortedGoods);
    } else if (sortType === 'length') {
      sortedGoods = sortLength(sortedGoods);
    }

    if (reversed) {
      sortedGoods = sortedGoods.reverse();
    }

    setGoods(sortedGoods);
  }, [sortType, reversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => {
            setSortType('alphabet');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => {
            setSortType('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => {
            setReversed(prev => !prev);
          }}
        >
          Reverse
        </button>

        {/* {(sortType !== null || reversed) && ( */}
        {!arraysAreEqual(goods, goodsFromServer) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortType(null);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
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
