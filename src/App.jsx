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
  const ALPHABETICALY = 'alphabetically';
  const LENGTH = 'length';
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const handleSortAlphabetically = () => {
    const sortedGoods = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setGoods(isReversed ? [...sortedGoods].reverse() : sortedGoods);
    setSortBy(ALPHABETICALY);
  };

  const handleSortByLength = () => {
    const sortedGoods = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setGoods(isReversed ? [...sortedGoods].reverse() : sortedGoods);
    setSortBy(LENGTH);
  };

  const handleReverse = () => {
    setGoods([...goods].reverse());
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setGoods([...goodsFromServer]);
    setSortBy('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === ALPHABETICALY ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === LENGTH ? '' : 'is-light'}`}
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

        {goods.join() !== goodsFromServer.join() && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
