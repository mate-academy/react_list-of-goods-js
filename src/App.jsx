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
  const [goods, setGoods] = useState(goodsFromServer);
  const [status, setStatus] = useState({
    alphabetical: false,
    bylength: false,
    reversed: false,
  });

  const isModified = status.alphabetical || status.bylength || status.reversed;

  function sortAlphabetically() {
    setGoods((prevState) => {
      if (!status.reversed) {
        return [...prevState].sort();
      }

      return [...prevState].sort((a, b) => b.localeCompare(a));
    });

    setStatus(prevState => ({
      ...prevState,
      alphabetical: true,
      bylength: false,
    }));
  }

  function sortByLength() {
    setGoods((prevState) => {
      if (!status.reversed) {
        return [...prevState].sort((a, b) => a.length - b.length);
      }

      return [...prevState].sort((a, b) => b.length - a.length);
    });

    setStatus(prevState => ({
      ...prevState,
      bylength: true,
      alphabetical: false,
    }));
  }

  function reverseGoods() {
    setGoods(prevState => [...prevState].reverse());
    setStatus(prevState => ({
      ...prevState,
      reversed: !prevState.reversed,
    }));
  }

  function resetGoods() {
    setGoods(goodsFromServer);
    setStatus({
      alphabetical: false,
      bylength: false,
      reversed: false,
    });
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            status.alphabetical ? 'button is-info' : 'button is-info is-light'
          }
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            status.bylength ? 'button is-success' : 'button is-success is-light'
          }
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            status.reversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
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
