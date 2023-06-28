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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreperedGoods(goods, { sortField, revers }) {
  const preparedGoods = [...goods];

  if (!sortField && revers) {
    return preparedGoods.reverse();
  }

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case (SORT_FIELD_NAME):
          return revers
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);
        case (SORT_FIELD_LENGTH):
          if (good2.length !== good1.length) {
            return revers
              ? good2.length - good1.length
              : good1.length - good2.length;
          }

          return revers
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [revers, setRevers] = useState(false);
  const visiblGoods = getPreperedGoods(goodsFromServer, { sortField, revers });
  const reset = () => {
    setSortField('');
    setRevers(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !revers,
          })}
          onClick={() => setRevers(!revers)}
        >
          Reverse
        </button>
        {(sortField || revers) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        )
        }
      </div>

      <ul>
        {visiblGoods.map(good => (
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
