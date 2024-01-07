import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const sortByDefault = {
  method: '',
  isReversedOrder: false,
};

const getPreparedGoods = (list, { method, isReversedOrder }) => {
  const preparedGoods = [...list];

  if (method) {
    switch (method) {
      case (SORT_BY_ALPHABET):
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case (SORT_BY_LENGTH):
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;

      default:
        break;
    }
  }

  if (isReversedOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortBy, setSortBy] = useState(sortByDefault);
  const goods = getPreparedGoods(goodsFromServer, sortBy);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy({ ...sortBy, method: SORT_BY_ALPHABET })}
          type="button"
          className={
            classNames(
              'button',
              'is-info',
              {
                'is-light': sortBy.method !== SORT_BY_ALPHABET,
              },
            )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy({ ...sortBy, method: SORT_BY_LENGTH })}
          type="button"
          className={
            classNames(
              'button',
              'is-success',
              {
                'is-light': sortBy.method !== SORT_BY_LENGTH,
              },
            )
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setSortBy(
            sortBy.isReversedOrder
              ? { ...sortBy, isReversedOrder: false }
              : { ...sortBy, isReversedOrder: true },
          )}
          type="button"
          className={classNames(
            'button',
            'is-warning',
            {
              'is-light': !sortBy.isReversedOrder,
            },
          )}
        >
          Reverse
        </button>

        {(sortBy.method || sortBy.isReversedOrder) && (
          <button
            onClick={() => setSortBy({
              method: '',
              isReversedOrder: false,
            })}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
