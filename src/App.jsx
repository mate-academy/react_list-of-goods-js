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

const SORT_ALPHABETICALLY = 'alphabetically';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(goods, sortType, isReversed) {
  const prepared = [...goods];

  if (sortType === SORT_ALPHABETICALLY) {
    prepared.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SORT_BY_LENGTH) {
    prepared.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    prepared.reverse();
  }

  return prepared;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, isReversed);
  const isChanged = sortType !== '' || isReversed;

  const reset = () => {
    setSortType('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SORT_ALPHABETICALLY ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SORT_BY_LENGTH ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SORT_BY_LENGTH)}
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

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
