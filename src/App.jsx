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
  const initialGoods = [...goodsFromServer];
  const [goods, setGoods] = useState([...initialGoods]);
  const [isReversed, setIsReversed] = useState(false);
  const [isAlpha, setIsAlpha] = useState(false);
  const [isSortByLength, setIsSortByLength] = useState(false);

  const sortAlphabetically = () => {
    const sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));

    setGoods(sortedGoods);
    setIsAlpha(true);
    setIsSortByLength(false);
    setIsReversed(false);
  };

  const sortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sortedGoods);
    setIsSortByLength(true);
    setIsAlpha(false);
    setIsReversed(false);
  };

  const reverseGoods = () => {
    const sortedGoods = [...goods].reverse();

    setGoods(sortedGoods);
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setIsAlpha(false);
    setIsSortByLength(false);
    setIsReversed(false);
  };

  const isInitialOrder = JSON.stringify(goods) === JSON.stringify(initialGoods);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isAlpha ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isSortByLength ? '' : 'is-light'}`}
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

        {!isInitialOrder && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
