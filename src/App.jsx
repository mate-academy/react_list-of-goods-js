import 'bulma/css/bulma.css';
import cn from 'classnames';
import { useState } from 'react';

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

const SORT_FIELD_ABC = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';
const SORT_FIELD_RESET = 'Reset';

function getPrepearedGoods(goods, { sortField, reverseOrder }) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods = prepearedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ABC:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseOrder) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseOrder, setReverseOrder] = useState(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField, reverseOrder,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ABC,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_ABC);
            setReverseOrder(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => {
            setSortField(SORT_FIELD_LENGTH);
            setReverseOrder(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverseOrder,
          })}
          onClick={() => setReverseOrder(!reverseOrder)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={cn('button is-danger', {
            'is-light': sortField !== SORT_FIELD_RESET,
          })}
          style={{ display: sortField ? '' : 'none' }}
          onClick={() => {
            setSortField('');
            setReverseOrder(false);
          }}
        >
          Reset
        </button>
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
