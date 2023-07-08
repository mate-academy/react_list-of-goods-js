import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

export const SORT_BY_NAME = 'is-info';
export const SORT_BY_LENGTH = 'is-success';

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

const sortList = (goods, buttonClass, isReversed) => {
  const goodsCopy = [...goods];

  if (buttonClass) {
    goodsCopy.sort((good1, good2) => {
      switch (buttonClass) {
        case SORT_BY_NAME:
          return good1.localeCompare(good2);

        case SORT_BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
};

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [sortDirection, setSortDirection] = useState(false);

  const preparedGoods = sortList(goodsFromServer, sortBy, sortDirection);

  const reset = () => {
    setSortDirection(false);
    setSortBy('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info', {
              'is-light': sortBy !== 'is-info',
            },
          )}
          onClick={() => {
            setSortBy('is-info');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success', {
              'is-light': sortBy !== 'is-success',
            },
          )}
          onClick={() => {
            setSortBy('is-success');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning', {
              'is-light': !sortDirection,
            },
          )}
          onClick={() => {
            setSortDirection(!sortDirection);
          }}
        >
          Reverse
        </button>

        {(
          sortBy || sortDirection
        ) && (
        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
        >
          Reset
        </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(goodItem => (
          <li
            data-cy="Good"
            key={goodItem}
          >
            {goodItem}
          </li>
        ))}
      </ul>
    </div>
  );
};
