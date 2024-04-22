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

export const App = () => {
  const visibleGoods = [...goodsFromServer];
  const [sortField, setSortField] = useState('');
  const [orderStraight, setOrderStraight] = useState(true);

  if (sortField === SORT_FIELD_ALPHABETICALLY) {
    visibleGoods.sort();
  } else if (sortField === SORT_FIELD_BY_LENGTH) {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (!orderStraight) {
    visibleGoods.reverse();
  }

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
