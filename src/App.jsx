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

const SORT_ALPHA = 'alpha';
const SORT_LENGTH = 'length';

function getPreparedGoods(goods, sortType, isReversed) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((a, b) => {
      if (sortType === SORT_ALPHA) {
        return a.localeCompare(b);
      }

      if (sortType === SORT_LENGTH) {
        return a.length - b.length || a.localeCompare(b);
      }

      return 0;
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const isOriginalOrder = !sortType && !isReversed;
  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, isReversed);

  const handleReset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SORT_ALPHA ? 'is-light' : ''}`}
          onClick={() => setSortType(SORT_ALPHA)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SORT_LENGTH ? 'is-light' : ''}`}
          onClick={() => setSortType(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
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