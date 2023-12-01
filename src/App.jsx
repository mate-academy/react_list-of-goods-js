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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const RESET = 'reset';

function getPreparedGoods(goods, sortFilter, reverseOrder) {
  const sortedGoods = [...goods];

  sortedGoods.sort((good1, good2) => {
    switch (sortFilter) {
      case SORT_BY_ALPHABET: {
        return good1.localeCompare(good2);
      }

      case SORT_BY_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  return !reverseOrder ? sortedGoods : sortedGoods.reverse();
}

export const App = () => {
  const [sortFilter, setSortFilter] = useState('');
  const [reverseOrder, setReverseOrder] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortFilter,
    reverseOrder,
  );

  function toggleReverse() {
    setReverseOrder(!reverseOrder);
  }

  function handleReset() {
    setSortFilter(RESET);
    setReverseOrder(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'is-light': sortFilter !== SORT_BY_ALPHABET,
          }, 'button is-info')}
          onClick={() => setSortFilter(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'is-light': sortFilter !== SORT_BY_LENGTH,
          }, 'button is-success')}
          onClick={() => setSortFilter(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'is-light': !reverseOrder,
          }, 'button is-warning')}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {JSON.stringify(visibleGoods) === JSON.stringify(goodsFromServer)
          ? '' : (
            <button
              type="button"
              className={cn({
                'is-light': sortFilter !== RESET,
              }, 'button is-danger')}
              onClick={handleReset}
            >
              Reset
            </button>
          )
        }

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
