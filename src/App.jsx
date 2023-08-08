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

const SORT_BY_ALPHABET = 'alphabet';
const SORT_BY_LENGTH = 'length';
const SORT_BY_INDEX_DESC = 'reverse default';
const ASC = 'asc';
const DESC = 'desc';

function getSortGoods(goods, sortField, sortDirection) {
  const preparedGoods = [...goods];

  if (sortField === SORT_BY_ALPHABET) {
    preparedGoods.sort((good1, good2) => {
      if (sortDirection === ASC) {
        return good1.localeCompare(good2);
      }

      return good2.localeCompare(good1);
    });
  } else if (sortField === SORT_BY_LENGTH) {
    preparedGoods.sort((good1, good2) => {
      const lengthComparison = good1.length - good2.length;

      if (sortDirection === ASC) {
        return lengthComparison;
      }

      if (lengthComparison !== 0) {
        return -lengthComparison;
      }

      return good2.localeCompare(good1);
    });
  } else if (sortField === SORT_BY_INDEX_DESC) {
    preparedGoods.sort((good1, good2) => preparedGoods.indexOf(good2)
    - preparedGoods.indexOf(good1));
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [sortDirection, setSortDirection] = useState(ASC);
  const sortGoods = getSortGoods(goodsFromServer, sortField, sortDirection);
  const sortReverse = () => {
    if (sortField === '') {
      setSortField(SORT_BY_INDEX_DESC);
    }

    if (sortDirection === DESC && sortField === SORT_BY_INDEX_DESC) {
      setSortField('');
    }

    if (sortDirection === DESC) {
      setSortDirection(ASC);
    }

    if (sortDirection === ASC) {
      setSortDirection(DESC);
    }
  };

  const resetSort = () => {
    setSortField('');
    setSortDirection(ASC);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_BY_ALPHABET);
          }}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
          }}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={sortReverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': sortDirection === ASC,
          })}
        >
          Reverse
        </button>

        {sortField && (
          <button
            onClick={resetSort}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
