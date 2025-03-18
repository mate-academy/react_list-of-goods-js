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

function processGoods(goods, sortState) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortState.sortType) {
      case SORT_BY_ALPHABET:
        return good1.localeCompare(good2);

      case SORT_BY_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (sortState.isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortState, setSortState] = useState({
    sortType: '',
    isReversed: false,
  });

  const goods = processGoods(goodsFromServer, sortState);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortState.sortType !== SORT_BY_ALPHABET,
          })}
          onClick={() => {
            setSortState(prev => ({ ...prev, sortType: SORT_BY_ALPHABET }));
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortState.sortType !== SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortState(prev => ({ ...prev, sortType: SORT_BY_LENGTH }));
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortState.isReversed !== true,
          })}
          onClick={() => {
            setSortState(prev => ({ ...prev, isReversed: !prev.isReversed }));
          }}
        >
          Reverse
        </button>

        {(sortState.isReversed || sortState.sortType) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortState({
                sortType: '',
                isReversed: false,
              });
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
