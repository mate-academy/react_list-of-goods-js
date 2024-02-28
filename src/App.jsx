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

const SORT_FIELD_ABC = 'abc';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, reverseOrder) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_ABC:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_FIELD_LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverseOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseOrder, setReverseOrder] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseOrder,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ABC)}
          className={`button is-info ${cn({ 'is-light': sortField !== SORT_FIELD_ABC })}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={`button is-success ${cn({ 'is-light': sortField !== SORT_FIELD_LENGTH })}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseOrder(!reverseOrder)}
          className={`button is-warning ${cn({ 'is-light': !reverseOrder })}`}
        >
          Reverse
        </button>

        {
          (sortField !== '' || reverseOrder) && (
            <button
              type="button"
              onClick={() => {
                setSortField('');
                setReverseOrder(false);
              }}
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
        }

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
