import React, { useState } from 'react';
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

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [activeSort, setActiveSort] = useState(null);

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setIsReversed(false);
    setActiveSort(null);
  };

  const sortAlphabetically = () => {
    setGoods(() => {
      const sortedGoods = [...goodsFromServer].sort((a, b) =>
        a.localeCompare(b),
      );

      if (isReversed) {
        return sortedGoods.reverse();
      }

      return sortedGoods;
    });
    setActiveSort('alphabetical');
  };

  const sortByLength = () => {
    setGoods(() => {
      const sortedGoods = [...goodsFromServer].sort(
        (a, b) => a.length - b.length,
      );

      if (isReversed) {
        return sortedGoods.reverse();
      }

      return sortedGoods;
    });
    setActiveSort('length');
  };

  const reverseGoods = () => {
    setGoods(prevGoods => [...prevGoods].reverse());
    setIsReversed(prevReversed => !prevReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === 'alphabetical' ? '' : 'is-light'}`}
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
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {goods.join() !== goodsFromServer.join() && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(index => (
          <li key={index} data-cy="Good">
            {index}
          </li>
        ))}
      </ul>
    </div>
  );
};
