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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const handleSortByName = () => {
    let sorted = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
    if (isReversed) {
      sorted = sorted.reverse();
    }
    setGoods(sorted);
    setSortType('name');
  };

  const handleSortByLength = () => {
    let sorted = [...goodsFromServer].sort((a, b) => a.length - b.length);
    if (isReversed) {
      sorted = sorted.reverse();
    }
    setGoods(sorted);
    setSortType('length');
  };

  const handleReverse = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortType('');
    setIsReversed(false);
  };

  // Reset button should only be visible if current order != original order
  const isChanged = JSON.stringify(goods) !== JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== 'name' ? 'is-light' : ''}`}
          onClick={handleSortByName}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType !== 'length' ? 'is-light' : ''
          }`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isChanged && (
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
