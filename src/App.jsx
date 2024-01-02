import { useState } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FIELD_ALPHABET = 'ab';
const SORT_FIELD_LENGTH = 'length';
const REVERS_FIELDS = 'fields';

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

function getPreperedGoods(goods, sortMethod, sortDirection) {
  const preperedGoods = [...goods];

  if (sortMethod) {
    preperedGoods.sort((good1, good2) => {
      switch (sortMethod) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (sortDirection) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortMethod, setSortMethod] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const visibleGoods = getPreperedGoods(
    goodsFromServer,
    sortMethod,
    sortDirection,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames('button is-info', {
              'is-light': sortMethod !== SORT_FIELD_ALPHABET,
            })
          }
          onClick={
            () => {
              setSortMethod(SORT_FIELD_ALPHABET);
            }
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames('button is-success', {
              'is-light': sortMethod !== SORT_FIELD_LENGTH,
            })
          }
          onClick={
            () => {
              setSortMethod(SORT_FIELD_LENGTH);
            }
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames('button is-warning', {
              'is-light': sortDirection !== REVERS_FIELDS,
            })
          }
          onClick={
            () => {
              setSortDirection(sortDirection === '' ? REVERS_FIELDS : '');
            }
          }
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={
            () => {
              setSortMethod('');
              setSortDirection('');
            }
          }
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
