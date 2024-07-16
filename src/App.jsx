import 'bulma/css/bulma.css';
import { useState } from 'react';
import cn from 'classnames';

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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

function sortGoods(goods, sortField, reverse) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_BY_NAME:
      preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SORT_BY_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;

    default:
      break;
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = sortGoods(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_NAME)}
          type="button"
          className={cn('button is-info', {
            'is-light': !(sortField === SORT_BY_NAME),
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': !(sortField === SORT_BY_LENGTH),
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {sortField || reverse ? (
          <button
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
