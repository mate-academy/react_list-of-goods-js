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

const SORT_BY_ALPHABET = 'Sort alphabetically';
const SORT_BY_LENGTH = 'Sort by length';

function getPrepareGoods(goods, { sortField, reverse }) {
  let prepareGoods = [...goods];

  if (sortField) {
    prepareGoods = prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_BY_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  const resetSorting = () => {
    if (sortField || reverse) {
      setSortField('');
      setReverse(false);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SORT_BY_ALPHABET);
          }}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_BY_ALPHABET })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SORT_BY_LENGTH);
          }}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_BY_LENGTH })
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverse(!reverse);
          }}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reverse })
          }
        >
          Reverse
        </button>

        <button
          onClick={resetSorting}
          type="button"
          className={cn('button is-danger is-light',
            { 'is-hidden': !(sortField || reverse) })
          }
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
