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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';
const REVERSE = true;

function getSortedGoods(goods, { sortField, reverse }) {
  const goodsList = [...goods];

  if (sortField) {
    goodsList.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  if (reverse === REVERSE) {
    goodsList.reverse();
  }

  return goodsList;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const sortedGoodsList = getSortedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  const reset = () => {
    setSortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_NAME)}
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_NAME },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
        >
          Sort by length
        </button>

        {!reverse ? (
          <button
            onClick={() => setReverse(REVERSE)}
            type="button"
            className="button is-warning is-light"
          >
            Reverse
          </button>
        ) : (
          <button
            onClick={() => setReverse(false)}
            type="button"
            className={cn(
              'button',
              'is-warning',
              { 'is-light': reverse !== true },
            )}
          >
            Reverse
          </button>
        )}

        {(sortField || reverse) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoodsList.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
