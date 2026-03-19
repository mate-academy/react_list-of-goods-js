import 'bulma/css/bulma.css';
import './App.scss';

import { useEffect, useState } from 'react';

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
  const [visibleGoods, setVisibleGoods] = useState(() => [...goodsFromServer]);
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const applySort = () => {
    const result = [...goodsFromServer];

    if (sortType === 'alphabet') {
      result.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === 'length') {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    setVisibleGoods(result);
  };

  const sortByAlphabet = () => {
    setSortType('alphabet');
  };

  const alphabetClass =
    sortType === 'alphabet' ? 'button is-info' : 'button is-info is-light';

  const sortByLength = () => {
    setSortType('length');
  };

  const lengthClass =
    sortType === 'length' ? 'button is-success' : 'button is-success is-light';

  const sortByReverse = () => {
    setIsReversed(prev => !prev);
  };

  const reverseClass =
    isReversed === true ? 'button is-warning' : 'button is-warning is-light';

  const reset = () => {
    setSortType(null);
    setIsReversed(false);
  };

  const resetClass =
    visibleGoods.join('|') !== goodsFromServer.join('|')
      ? 'button is-danger'
      : 'button is-danger is-light';

  useEffect(() => {
    applySort();
  }, [sortType, isReversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={alphabetClass}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button type="button" className={lengthClass} onClick={sortByLength}>
          Sort by length
        </button>

        <button type="button" className={reverseClass} onClick={sortByReverse}>
          Reverse
        </button>

        {visibleGoods.join('|') !== goodsFromServer.join('|') && (
          <button type="button" className={resetClass} onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
