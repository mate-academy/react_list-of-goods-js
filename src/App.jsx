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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_BY_LENGTH = 'by length';

function getPreparedGoods(goods, sortField, orderStraight) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_ALPHABETICALLY:
      preparedGoods.sort();
      break;
    case SORT_FIELD_BY_LENGTH:
      preparedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (!orderStraight) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [orderStraight, setOrderStraight] = useState(true);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    orderStraight,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_FIELD_ALPHABETICALLY);
          }}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_FIELD_BY_LENGTH);
          }}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            if (orderStraight) {
              setOrderStraight(false);
            } else {
              setOrderStraight(true);
            }
          }}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': orderStraight,
          })}
        >
          Reverse
        </button>

        {(!sortField && orderStraight) || (
          <button
            onClick={() => {
              setSortField('');
              setOrderStraight(true);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
