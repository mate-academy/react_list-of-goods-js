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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, query, reversed }) {
  let preparedGoods = [...goods];

  if (query) {
    preparedGoods = preparedGoods.filter(good => good.includes(query));
  }

  if (sortField) {
    preparedGoods.sort((g1, g2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return g1.localeCompare(g2);

        case SORT_FIELD_LENGTH:
          return g1.length - g2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods = preparedGoods.toReversed();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  function hanleReset() {
    setSortField('');
    setReversed(false);
  }

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'name',
          })}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={hanleReset}
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
