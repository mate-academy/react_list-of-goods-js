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
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const compareAlphabetically = (a, b) => a.localeCompare(b);
  const compareByLength = (a, b) => a.length - b.length;

  const sortAlphabetically = () => {
    const sortedGoods = [...goodsFromServer].sort(compareAlphabetically);

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType('alphabetically');
  };

  const sortByLength = () => {
    const sortedGoods = [...goodsFromServer].sort(compareByLength);

    if (isReversed) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType('length');
  };

  const reverseGoods = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setSortType(null);
    setIsReversed(false);
  };

  const getLightClass = isActive => {
    return isActive ? '' : 'is-light';
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${getLightClass(sortType === 'alphabetically')}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${getLightClass(sortType === 'length')}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${getLightClass(isReversed)}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortType !== null || isReversed) && (
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
