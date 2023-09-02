import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import cn from 'classnames';

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

const sortByalphabet = 'alphabet';
const sortByLength = 'length';

function getPreparedGoods(goods, sortField, reverse) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case sortByalphabet:
          return good1.localeCompare(good2);
        case sortByLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const resetSort = () => {
    setSortField('');
    setReverse(false);
  };

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== sortByalphabet,
          })}
          onClick={() => setSortField(sortByalphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== sortByLength,
          })}
          onClick={() => setSortField(sortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn('is-danger', 'is-light', {
            button: sortField !== ('') || reverse,
          })}
          onClick={() => resetSort()}
          hidden
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
