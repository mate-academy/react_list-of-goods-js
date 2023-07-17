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

const SORT_FIELD_ALPHABETICALLY = 'name';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, reverseIsActive }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  if (reverseIsActive) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseIsActive, setReverseIsActive] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, reverseIsActive },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        {
          reverseIsActive
            ? (
              <button
                onClick={() => {
                  setReverseIsActive(false);
                  setSortField(sortField);
                }}
                type="button"
                className={cn('button is-warning', {
                  'is-light': !reverseIsActive,
                })}
              >
                Reverse
              </button>
            )
            : (
              <button
                onClick={() => {
                  setReverseIsActive(true);
                  setSortField(sortField);
                }}
                type="button"
                className={cn('button is-warning', {
                  'is-light': !reverseIsActive,
                })}
              >
                Reverse
              </button>
            )
        }

        {
          sortField !== '' || reverseIsActive
            ? (
              <button
                onClick={() => {
                  setSortField('');
                  setReverseIsActive(false);
                }}
                type="button"
                className="button is-danger is-light"
              >
                Reset
              </button>
            )
            : ''
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li className="Good" key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
