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

const IS_DIRECT_ORDER = true;

const SORT_DEFAULT = '';
const SORT_BY_NAME = 'name';
const SORT_BY_NAME_LENGTH = 'length';

function getPreparedGoods(goods, { sortParameter, order }) {
  const preparedGoods = [...goods];
  let sortFunction = null;

  switch (sortParameter) {
    case SORT_BY_NAME:
      sortFunction = (good1, good2) => good1.localeCompare(good2);
      break;

    case SORT_BY_NAME_LENGTH:
      sortFunction = (good1, good2) => good1.length - good2.length;
      break;

    default:
      sortFunction = () => 0;
  }

  preparedGoods.sort(sortFunction);

  return order ? preparedGoods : preparedGoods.reverse();
}

export const App = () => {
  const [sortParameter, setSortParameter] = useState(SORT_DEFAULT);
  const [order, setOrder] = useState(IS_DIRECT_ORDER);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortParameter,
    order,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortParameter !== SORT_BY_NAME,
          })}
          onClick={() => setSortParameter(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortParameter !== SORT_BY_NAME_LENGTH,
          })}
          onClick={() => setSortParameter(SORT_BY_NAME_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': order,
          })}
          onClick={() => setOrder(!order)}
        >
          Reverse
        </button>

        {(sortParameter || !order) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortParameter(SORT_DEFAULT);
              setOrder(IS_DIRECT_ORDER);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
