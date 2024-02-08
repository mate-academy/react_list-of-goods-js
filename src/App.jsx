import cn from 'classnames';
import { useState } from 'react';

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

const ACTIVE_ABC = 'abc';
const ACTIVE_LENGTH = 'length';
const ACTIVE_REVERSE = true;

function getPreparedGoods(goods, { sortField, reverseField }) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((sortA, sortB) => {
      switch (sortField) {
        case ACTIVE_ABC:
          return sortA.localeCompare(sortB);

        case ACTIVE_LENGTH:
          return sortA[sortField] - sortB[sortField];

        case ACTIVE_REVERSE:
          return sortA - sortB;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods = preparedGoods.reverse();
  }
  // if (reverseField) {
  //   preparedGoods.sort((sortA, sortB) => {
  //     switch (sortField) {
  //       case ACTIVE_ABC:
  //         return sortB.localeCompare(sortA);

  //       case ACTIVE_LENGTH:
  //         return sortB[sortField] - sortA[sortField];

  //       default:
  //         return 0;
  //     }
  //   });

  //   // preparedGoods.reverse();
  // }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, reverseField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortField !== ACTIVE_ABC },
          )}
          onClick={() => {
            setSortField(ACTIVE_ABC);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortField !== ACTIVE_LENGTH },
          )}
          onClick={() => {
            setSortField(ACTIVE_LENGTH);
          }}
        >
          Sort by length
        </button>

        {reverseField === ACTIVE_REVERSE ? (
          <button
            type="button"
            className="button is-warning"
            onClick={() => {
              setReverseField(false);
            }}
          >
            Reverse
          </button>
        ) : (
          <button
            type="button"
            className="button is-warning is-light"
            onClick={() => {
              setReverseField(ACTIVE_REVERSE);
            }}
          >
            Reverse
          </button>
        )}

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
