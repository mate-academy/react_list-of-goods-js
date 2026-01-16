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

const SORT_BY_LENGTH = 'length';
const SORT_BY_ALPHABETICALLY = 'alphabet';

function getVisibleGoods(goods, sortField, isReverse) {
  const result = [...goods];

  if (sortField === SORT_BY_LENGTH) {
    result.sort((a, b) => a.length - b.length);
  }

  if (sortField === SORT_BY_ALPHABETICALLY) {
    result.sort((a, b) => a.localeCompare(b));
  }

  if (isReverse) {
    result.reverse();
  }

  return result;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getVisibleGoods(goodsFromServer, sortField, isReverse);
  const reset = () => {
    setSortField('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortField === SORT_BY_ALPHABETICALLY ? '' : 'is-light'
          }`}
          onClick={() => setSortField(SORT_BY_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${
            sortField === SORT_BY_LENGTH ? '' : 'is-light'
          }`}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverse === true ? '' : 'is-light'}`}
          onClick={() => setIsReverse(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
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
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
