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
  const [isReversed, setIsReversed] = useState(false);
  const [activeSort, setActiveSort] = useState(null);

  const sortAlphabetically = () => {
    const sortedGoods = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? [...sortedGoods].reverse() : sortedGoods);
    setActiveSort('alphabet');
  };

  const sortByLength = () => {
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setGoods(isReversed ? [...sortedGoods].reverse() : sortedGoods);

    setActiveSort('length');
  };

  const reverseList = () => {
    const newGoods = [...goods].reverse();

    setGoods(newGoods);
    setIsReversed(!isReversed);

    if (JSON.stringify(newGoods) === JSON.stringify(goodsFromServer)) {
      setActiveSort(null);
    }
  };

  const resetList = () => {
    setGoods(goodsFromServer);
    setIsReversed(false);
    setActiveSort(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseList}
        >
          Reverse
        </button>

        {JSON.stringify(goods) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetList}
          >
            Reset
          </button>
        )}
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
