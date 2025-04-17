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

const SORT_BY_ALPHABET = 'alpha';
const SORT_BY_LENGTH = 'length';
const SORT_ASCENDING = 'asc';
const SORT_DESCENDING = 'desc';

function sortGoods(goods, { sortParameter, sortDirection }) {
  const preparedGoods = [...goods];

  if (sortParameter) {
    preparedGoods.sort((a, b) => {
      switch (sortParameter) {
        case SORT_BY_ALPHABET:
          return a.localeCompare(b);
        case SORT_BY_LENGTH:
          return a.length - b.length;
        default:
          return a - b;
      }
    });
  }

  if (sortDirection === SORT_DESCENDING) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortParameter, setSortParameter] = useState('');
  const [sortDirection, setSortDirection] = useState(SORT_ASCENDING);
  const goods = sortGoods(goodsFromServer, { sortParameter, sortDirection });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'button is-info': true,
            'is-light': sortParameter !== SORT_BY_ALPHABET,
          })}
          onClick={() => setSortParameter(SORT_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'button is-success': true,
            'is-light': sortParameter !== SORT_BY_LENGTH,
          })}
          onClick={() => setSortParameter(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'button is-warning': true,
            'is-light': sortDirection !== SORT_DESCENDING,
          })}
          onClick={() => {
            setSortDirection(
              sortDirection === SORT_ASCENDING
                ? SORT_DESCENDING
                : SORT_ASCENDING,
            );
          }}
        >
          Reverse
        </button>

        {(sortParameter || sortDirection !== SORT_ASCENDING) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortParameter('');
              setSortDirection(SORT_ASCENDING);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
