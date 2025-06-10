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

const arraysAreEqual = (a, b) => {
  return a.length === b.length && a.every((item, i) => item === b[i]);
};

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [isActive, setActive] = useState('');

  const sortAlph = () => {
    setVisibleGoods([...visibleGoods].sort((a, b) => a.localeCompare(b)));
    setActive('alph');
  };

  const sortLength = () => {
    setVisibleGoods([...visibleGoods].sort((a, b) => a.length - b.length));
    setActive('length');
  };

  const reverse = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setActive('reverse');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${isActive !== 'alph' ? ' is-light' : ''}`}
          onClick={sortAlph}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info${isActive !== 'length' ? ' is-light' : ''}`}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info${isActive !== 'reverse' ? ' is-light' : ''}`}
          onClick={reverse}
        >
          Reverse
        </button>

        {!arraysAreEqual(visibleGoods, goodsFromServer) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setVisibleGoods([...goodsFromServer])}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
