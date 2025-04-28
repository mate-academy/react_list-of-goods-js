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
  const [currentGoods, setCurrentGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(null);

  const handleSortAlphabetically = () => {
    const sortedGoods = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
    const finalGoods = isReversed ? [...sortedGoods].reverse() : sortedGoods;

    setCurrentGoods(finalGoods);
    setSortType('alphabet');
  };

  const handleSortByLength = () => {
    const sortedGoods = [...goodsFromServer].sort((a, b) => {
      const lengthDiff = a.length - b.length;

      return lengthDiff !== 0 ? lengthDiff : a.localeCompare(b);
    });
    const finalGoods = isReversed ? [...sortedGoods].reverse() : sortedGoods;

    setCurrentGoods(finalGoods);
    setSortType('length');
  };

  const handleReverse = () => {
    const reversedGoods = [...currentGoods].reverse();

    setCurrentGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setCurrentGoods(goodsFromServer);
    setIsReversed(false);
    setSortType(null);
  };

  const isOriginalOrder = currentGoods.every(
    (good, index) => good === goodsFromServer[index],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
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
        {currentGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
