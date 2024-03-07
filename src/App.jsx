import 'bulma/css/bulma.css';
import './App.scss';
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

const SORT_FIELD_ALPHABETICALLY = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';
const SORT_FIELD_REVERSE = 'Reverse';

function getPreperedGoods(sortField, checkIsReverse) {
  const preperedGoods = [...goodsFromServer];

  if (sortField) {
    preperedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (checkIsReverse) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App = () => {
  const [sortField, setsortField] = useState('');
  const [checkIsReverse, setcheckIsReverse] = useState(false);

  const visibleGoods = getPreperedGoods(sortField, checkIsReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setsortField(SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className={
            sortField === SORT_FIELD_ALPHABETICALLY
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          {SORT_FIELD_ALPHABETICALLY}
        </button>

        <button
          onClick={() => setsortField(SORT_FIELD_LENGTH)}
          type="button"
          className={
            sortField === SORT_FIELD_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          {SORT_FIELD_LENGTH}
        </button>

        <button
          type="button"
          onClick={() => setcheckIsReverse(!checkIsReverse)}
          className={
            checkIsReverse ? 'button is-warning' : 'button is-warning is-light'
          }
        >
          {SORT_FIELD_REVERSE}
        </button>

        {(sortField || checkIsReverse) && (
          <button
            onClick={() => {
              setsortField('');
              setcheckIsReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
