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

const SORT_ALPHABETICALLY = 'Sort alphabetically';
const SORT_LENGTH = 'Sort by length';
const SORT_REVERSE = 'Reverse';

function getPreparedGoods(goods, { sortField }) {
  const preparedGoods = [...goods];

  if (sortField.length > 0) {
    sortField.forEach((elem) => {
      switch (elem) {
        case SORT_ALPHABETICALLY:

          return preparedGoods
            .sort((good1, good2) => good1.localeCompare(good2));
        case SORT_LENGTH:

          return preparedGoods
            .sort((good1, good2) => good1.length - good2.length);
        case SORT_REVERSE:

          return preparedGoods.reverse();
        default:
          return preparedGoods;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState([]);
  const visibleGoods = getPreparedGoods(goodsFromServer, { sortField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField.indexOf(SORT_ALPHABETICALLY) === -1,
          })}
          onClick={() => (
            sortField.indexOf(SORT_REVERSE) !== -1
              ? setSortField([SORT_ALPHABETICALLY, ...sortField])
              : setSortField([SORT_ALPHABETICALLY])
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField.indexOf(SORT_LENGTH) === -1,
          })}
          onClick={() => (
            sortField.indexOf(SORT_REVERSE) !== -1
              ? setSortField([SORT_LENGTH, ...sortField])
              : setSortField([SORT_LENGTH])
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortField.indexOf(SORT_REVERSE) === -1
              || sortField
                .filter(elem => elem === SORT_REVERSE).length % 2 === 0,
          })}
          onClick={() => (
            setSortField([...sortField, SORT_REVERSE])
          )}
        >
          Reverse
        </button>

        {
          (visibleGoods.toString() !== goodsFromServer.toString()) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => (
                setSortField([])
              )}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        { visibleGoods.map((good, index) => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
