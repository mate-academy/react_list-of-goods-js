import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
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

const NO_SORT = '';
const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';
const NO_REVERSE = false;

function getPreparedGoods(goods, { sortBy, inReverseOrder }) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SORT_BY_NAME:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (inReverseOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState(NO_SORT);
  const [inReverseOrder, setInReverseOrder] = useState(NO_REVERSE);

  const goods = getPreparedGoods(goodsFromServer, { sortBy, inReverseOrder });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SORT_BY_NAME,
          })}
          onClick={() => setSortBy(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortBy(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !inReverseOrder,
          })}
          onClick={() => setInReverseOrder(!inReverseOrder)}
        >
          Reverse
        </button>

        {(!!sortBy || inReverseOrder) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(NO_SORT);
              setInReverseOrder(NO_REVERSE);
            }}
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
