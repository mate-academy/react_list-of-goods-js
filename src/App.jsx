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

const prepareGoods = (goods, { field, isReverse }) => {
  const preparedGoods = [...goods];

  if (field) {
    preparedGoods.sort((good1, good2) => {
      switch (field) {
        case SORT_FIELD_NAME: {
          return good1.localeCompare(good2);
        }

        case SORT_FIELD_LENGTH: {
          return good1.length - good2.length;
        }

        default:
          return 0;
      }
    });
  }

  return isReverse ? preparedGoods.reverse() : preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState(null);
  const [reverse, setReverse] = useState(false);
  const showGoods = prepareGoods(goodsFromServer, {
    field: sortField,
    isReverse: reverse,
  });

  const reset = () => {
    setSortField(null);
    setReverse(false);
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
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
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
        {showGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
