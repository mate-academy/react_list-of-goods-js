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

  const sortAlphabetically = () => {
    const sortedGoods = [...currentGoods].sort((a, b) => a.localeCompare(b));
    const finalGoods = isReversed ? [...sortedGoods].reverse() : sortedGoods;

    setCurrentGoods(finalGoods);
    setSortType('alphabet');
  };

  const sortByLength = () => {
    const sortedGoods = [...currentGoods].sort((a, b) => {
      const lengthDiff = a.length - b.length;

      return lengthDiff !== 0 ? lengthDiff : a.localeCompare(b);
    });
    const finalGoods = isReversed ? [...sortedGoods].reverse() : sortedGoods;

    setCurrentGoods(finalGoods);
    setSortType('length');
  };

  const reverseGoods = () => {
    const reversedGoods = [...currentGoods].reverse();

    setCurrentGoods(reversedGoods);

    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setCurrentGoods(goodsFromServer);
    setIsReversed(false);
    setSortType(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
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

        {currentGoods.join(',') !== goodsFromServer.join(',') && (
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
        {currentGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
