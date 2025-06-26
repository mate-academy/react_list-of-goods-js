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
  const [originalGoods] = useState(goodsFromServer);
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);

  const [activeSort, setActiveSort] = useState(null);
  const [isSorted, setIsSorted] = useState(false);

  const handleSortAlphabetically = () => {
    const sortedGoods = [...originalGoods].sort((a, b) => a.localeCompare(b));

    setVisibleGoods(sortedGoods);
    setActiveSort('alphabet');
    setIsSorted(true);
  };

  const handleSortByLength = () => {
    const sortedGoods = [...originalGoods].sort((a, b) => a.length - b.length);

    setVisibleGoods(sortedGoods);
    setActiveSort('length');
    setIsSorted(true);
  };

  const handleReverse = () => {
    const reversedGoods = [...visibleGoods].reverse();

    setVisibleGoods(reversedGoods);
    setActiveSort('reverse');
    setIsSorted(true);
  };

  const handleReset = () => {
    setVisibleGoods(originalGoods);
    setActiveSort(null);
    setIsSorted(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort !== 'alphabet' ? 'is-light' : ''}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort !== 'length' ? 'is-light' : ''}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${activeSort !== 'reverse' ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isSorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
