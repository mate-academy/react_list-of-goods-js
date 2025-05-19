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
  const [sortType, setSortType] = useState('default');
  const [isReversed, setIsReversed] = useState(false);

  const getSortedGoods = () => {
    const sorted = [...goodsFromServer];

    if (sortType === 'alphabet') {
      sorted.sort();
    } else if (sortType === 'length') {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  };

  const sortAlphabetical = () => {
    setSortType('alphabet');
  };

  const sortByLength = () => {
    setSortType('length');
  };

  const reverseGoods = () => {
    setIsReversed(prev => !prev);
  };

  const resetGoods = () => {
    setSortType('default');
    setIsReversed(false);
  };

  const isOriginalOrder =
    !isReversed &&
    getSortedGoods().every((item, index) => item === goodsFromServer[index]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={sortAlphabetical}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
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
        {getSortedGoods().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
