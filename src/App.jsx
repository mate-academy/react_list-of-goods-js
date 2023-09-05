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
  const [sortedGoods, setSortedGoods] = useState(goodsFromServer);

  const handleButtonSortAlphabetically = () => {
    const sorted = [...sortedGoods].sort();

    setSortedGoods(sorted);
  };

  const handleButtonSortByLength = () => {
    const sorted = [...sortedGoods].sort((a, b) => a.length - b.length);

    setSortedGoods(sorted);
  };

  const handleButtonReverse = () => {
    const sorted = [...sortedGoods].reverse();

    setSortedGoods(sorted);
  };

  const handleButtonReset = () => {
    setSortedGoods(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={handleButtonSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={handleButtonSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={handleButtonReverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={handleButtonReset}
        >
          Reset
        </button>
      </div>
      <ul>
        {sortedGoods
          .map(good => <li data-cy="Good" key={good}>{good}</li>)}
      </ul>
    </div>
  );
};
