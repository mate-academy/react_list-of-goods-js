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
  const [sortType, setSortType] = useState(null);
  const [checkRevers, setCheckReverse] = useState(false);

  const handleSort = type => {
    setSortType(type);
  };

  const visibleGoods = [...goodsFromServer];

  if (sortType === 'alphabetical') {
    visibleGoods.sort();
  } else if (sortType === 'length') {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (checkRevers) {
    visibleGoods.reverse();
  }

  const reversedGoods = () => {
    setCheckReverse(!checkRevers);
  };

  const resetState = () => {
    setSortType(null);
    setCheckReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetical' ? '' : 'is-light'}`}
          onClick={() => handleSort('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${checkRevers ? '' : 'is-light'}`}
          onClick={reversedGoods}
        >
          Reverse
        </button>

        {(sortType || checkRevers) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetState}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good, index) => {
          const uniqueKey = `${index} - ${Math.floor(Math.random * goodsFromServer.length)}`;

          return (
            <li key={uniqueKey} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
