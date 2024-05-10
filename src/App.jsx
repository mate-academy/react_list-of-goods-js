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

const SORT_TYPE_ALPHABETICALLY = 'alphabetically';
const SORT_TYPE_BY_LENGTH = 'by length';

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reverse, setReverse] = useState(false);
  const goods = [...goodsFromServer];

  if (sortType) {
    goods.sort((good1, good2) => {
      switch (sortType) {
        case SORT_TYPE_ALPHABETICALLY:
          return good1.localeCompare(good2);
        case SORT_TYPE_BY_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    goods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SORT_TYPE_ALPHABETICALLY)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SORT_TYPE_ALPHABETICALLY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SORT_TYPE_BY_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SORT_TYPE_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {(sortType || reverse) && (
          <button
            onClick={() => {
              setSortType('');
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
