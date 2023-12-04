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

const SORT_BY_ABC = 'abc';
const SORT_BY_LENGTH = 'length';
const RESET = 'reset';

function getPreparedGoods(goods, sortFilter, reverseOrder) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortFilter) {
      case SORT_BY_ABC:
        return good1.localeCompare(good2);

      case SORT_BY_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  return !reverseOrder ? preparedGoods : preparedGoods.reverse();
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverseOrder, setIsReverseOrder] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReverseOrder,
  );

  function toggleReverse() {
    setIsReverseOrder(!isReverseOrder);
  }

  function toggleReset() {
    setSortField('');
    setIsReverseOrder(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'is-light': sortField !== SORT_BY_ABC,
          }, 'button is-info')}
          onClick={() => setSortField(SORT_BY_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'is-light': sortField !== SORT_BY_LENGTH,
          }, 'button is-success')}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'is-light': !isReverseOrder,
          }, 'button is-warning')}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortField || isReverseOrder) && (
          <button
            type="button"
            className={cn({
              'is-light': sortField !== RESET,
            }, 'button is-danger')}
            onClick={toggleReset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
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
