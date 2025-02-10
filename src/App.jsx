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
  // Hooks
  const [goods, setGoods] = useState(goodsFromServer);
  const [isReverse, setIsReverse] = useState(false);
  const [sortType, setSortType] = useState(null); // null, 'alpha', 'length'

  // Handlers

  const handleSortAlphabetically = () => {
    setSortType('alphabetically');
    setGoods([...goodsFromServer].sort());
  };

  const handleSortByLength = () => {
    setSortType('length');
    setGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
  };

  const handleReverse = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReverse(!isReverse);
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setIsReverse(false);
    setSortType(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortType === 'alphabetically'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortType === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReverse === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={handleReverse}
        >
          Reverse
        </button>

        {sortType !== null || isReverse ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
