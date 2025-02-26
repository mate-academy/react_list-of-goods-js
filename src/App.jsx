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
  const [sortType, setSortType] = useState(null);

  const handleSortAlphabetically = () => {
    let sortedGoods = [...goodsFromServer].sort();
    if (isReversed) sortedGoods.reverse(); // Якщо реверс увімкнено, перевертаємо

    setGoods(sortedGoods);
    setSortType('alphabetical');
  };

  const handleSortByLength = () => {
    let sortedGoods = [...goodsFromServer].sort((a, b) => a.length - b.length);
    if (isReversed) sortedGoods.reverse(); // Якщо реверс увімкнено, перевертаємо

    setGoods(sortedGoods);
    setSortType('length');
  };

  const handleReverse = () => {
    const reversedGoods = [...goods].reverse();
    setGoods(reversedGoods);
    setIsReversed(!isReversed);

    // Якщо масив знову дорівнює початковому - скидаємо сортування
    if (JSON.stringify(reversedGoods) === JSON.stringify(goodsFromServer)) {
      setSortType(null);
      setIsReversed(false);
    }
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetical' ? '' : 'is-light'}`}
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

        {JSON.stringify(goods) !== JSON.stringify(goodsFromServer) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
