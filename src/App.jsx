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
  const [currentGoods, setCurrentGoods] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);

  const alphabetical = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
  const byLength = [...goodsFromServer].sort((a, b) => a.length - b.length);

  const isOriginal =
    JSON.stringify(currentGoods) === JSON.stringify(goodsFromServer);
  const isAlphabetical =
    JSON.stringify(currentGoods) === JSON.stringify(alphabetical) &&
    !isReversed;
  const isLength =
    JSON.stringify(currentGoods) === JSON.stringify(byLength) && !isReversed;
  const isReverse = isReversed;

  const sortAlphabetically = () => {
    setCurrentGoods([...alphabetical]);
    setIsReversed(false);
  };

  const sortByLength = () => {
    setCurrentGoods([...byLength]);
    setIsReversed(false);
  };

  const reverseGoods = () => {
    setCurrentGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setCurrentGoods([...goodsFromServer]);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={`button is-info ${isAlphabetical ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${isLength ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverseGoods}
          type="button"
          className={`button is-warning ${isReverse ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isOriginal && (
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
        {currentGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
