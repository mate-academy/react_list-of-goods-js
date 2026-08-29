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

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [activeSort, setActiveSort] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const applySorting = (sortType, sortFunction) => {
    const sortedGoods = [...goodsFromServer].sort(sortFunction);

    if (activeSort === sortType) {
      sortedGoods.reverse();
      setIsReversed(prev => !prev);
    } else if (isReversed) {
      sortedGoods.reverse();

      if (activeSort !== null) {
        setIsReversed(false);
      }
    }

    setGoods(sortedGoods);
    setActiveSort(sortType);
  };

  const sortAlphabetically = () => {
    applySorting('alphabetically', (a, b) => a.localeCompare(b));
  };

  const sortByLength = () => {
    applySorting('length', (a, b) => a.length - b.length);
  };

  const reverseGoods = () => {
    setGoods([...goods].reverse());
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setActiveSort(null);
    setIsReversed(false);
  };

  const isOriginalOrder =
    goods.length === goodsFromServer.length &&
    goods.every((good, index) => good === goodsFromServer[index]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            activeSort === 'alphabetically' ? '' : 'is-light'
          }`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            activeSort === 'length' ? '' : 'is-light'
          }`}
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

        {!isOriginalOrder && (
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
