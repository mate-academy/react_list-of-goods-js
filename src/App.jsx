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
  const [activeSort, setActiveSort] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const SORT_BY_ALPHABET = 'Alphabetically';
  const SORT_BY_LENGTH = 'ByLength';

  const sortAlphabetically = () => {
    const sortedGoods = [...goods].sort((a, b) => {
      return isReversed ? b.localeCompare(a) : a.localeCompare(b);
    });

    setGoods(sortedGoods);
    setActiveSort(SORT_BY_ALPHABET);
  };

  const sortByLength = () => {
    const sortedGoods = [...goods].sort((a, b) => {
      return isReversed ? b.length - a.length : a.length - b.length;
    });

    setGoods(sortedGoods);
    setActiveSort(SORT_BY_LENGTH);
  };

  const reverseGoods = () => {
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
    setIsReversed(!isReversed);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
    setIsReversed(false);
    setActiveSort('');
  };

  const shouldShowReset = activeSort !== '' || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeSort === SORT_BY_ALPHABET ? '' : 'is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeSort === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${isReversed ? 'is-warning' : 'is-warning is-light'}`}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {shouldShowReset && (
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
