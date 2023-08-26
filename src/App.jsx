import { useState } from 'react';
import cn from 'classnames';

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

const SORT_BY_ALPHAB = 'name';
const SORT_BY_LENGTH = 'length';

export const App = () => {
  let goods = [...goodsFromServer];
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  if (sortField === SORT_BY_ALPHAB) {
    goods = goods.sort();
  }

  if (sortField === SORT_BY_LENGTH) {
    goods = goods.sort((a, b) => a.length - b.length);
  }

  if (isReverse) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_BY_ALPHAB)}
          className={cn(
            'button is-info', { 'is-light': sortField !== SORT_BY_ALPHAB },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_BY_LENGTH)}
          className={cn(
            'button is-success', { 'is-light': sortField !== SORT_BY_LENGTH },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReverse(!isReverse)}
          className={cn(
            'button is-warning', { 'is-light': isReverse === false },
          )}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            type="button"
            onClick={() => {
              setSortField('');
              setIsReverse(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
