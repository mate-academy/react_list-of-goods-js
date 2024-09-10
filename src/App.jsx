import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState('');

  const sortAlphabetically = () => {
    setGoods(
      [...goods].sort(
        isReversed
          ? (a, b) => b.localeCompare(a)
          : (a, b) => a.localeCompare(b),
      ),
    );
    setSortType('alphabeticall');
  };

  const sortByLength = () => {
    setGoods(
      [...goods].sort(
        isReversed
          ? (a, b) => b.length - a.length
          : (a, b) => a.length - b.length,
      ),
    );
    setSortType('length');
  };

  const reverse = () => {
    setGoods([...goods].reverse());
    setReversed(!isReversed);
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
    setSortType('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== 'alphabeticall' && 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== 'length' && 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortType || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
