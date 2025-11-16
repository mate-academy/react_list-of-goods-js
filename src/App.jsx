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
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const sortAlphabetically = () => {
    setSortType('alphabet');

    const sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? [...sorted].reverse() : sorted);
  };

  const sortByLength = () => {
    setSortType('length');

    const sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);

    setGoods(isReversed ? [...sorted].reverse() : sorted);
  };

  const reverseOrder = () => {
    setGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const resetOrder = () => {
    setGoods(goodsFromServer);
    setSortType(null);
    setIsReversed(false);
  };

  const isInitial = JSON.stringify(goods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
          data-cy="SortAlphabetically"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
          data-cy="SortByLength"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseOrder}
          data-cy="Reverse"
        >
          Reverse
        </button>

        {!isInitial && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetOrder}
            data-cy="Reset"
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
