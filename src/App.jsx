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

const getSortedGoods = (goods, sortType) => {
  const sortedGoods = [...goods];

  if (sortType === 'alphabet') {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === 'length') {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  return sortedGoods;
};

export const App = () => {
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getSortedGoods(goodsFromServer, sortType);

  if (isReversed) {
    visibleGoods.reverse();
  }

  const isOriginalOrder = sortType === null && !isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => setSortType('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => setSortType('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(current => !current)}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType(null);
              setIsReversed(false);
            }}
          >
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
