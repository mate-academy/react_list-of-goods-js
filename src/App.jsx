import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FIELDS = {
  length: 'length',
  name: 'name',
};

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

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELDS.length:
          return a[sortField] - b[sortField];

        case SORT_FIELDS.name:
          return a.localeCompare(b);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setReverseField] = useState();
  const sortedOrReversed = sortField || isReversed;
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, isReversed });

  const {
    name,
    length,
  } = SORT_FIELDS;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={cn(
            'button is-info',
            { 'is-light': sortField !== name },
          )}
          onClick={() => setSortField(name)}
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          className={cn(
            'button is-success',
            { 'is-light':
            sortField !== length },
          )}
          onClick={() => setSortField(length)}
          type="button"
        >
          Sort by length
        </button>

        <button
          className={cn(
            'button is-warning',
            { 'is-light':
            !isReversed },
          )}
          onClick={() => setReverseField(!isReversed)}
          type="button"
        >
          Reverse
        </button>

        {(sortedOrReversed)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseField(undefined);
            }}
          >
            Reset
          </button>
        )}
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
