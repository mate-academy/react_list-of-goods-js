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

const SORT_ABC = 'abc';
const SORT_LENGTH = 'length';

function visiableGoods(initialGoods, { sortField, isReverse }) {
  const goods = [...initialGoods];

  if (sortField) {
    goods.sort((good1, good2) => {
      switch (sortField) {
        case (SORT_ABC):
          return good1.localeCompare(good2);

        case (SORT_LENGTH):
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setReverse] = useState(false);
  const goods = visiableGoods(goodsFromServer, { sortField, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(['button', 'is-info'], {
            'is-light': sortField !== SORT_ABC,
          })}
          onClick={() => setSortField(SORT_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(['button', 'is-success'], {
            'is-light': sortField !== SORT_LENGTH,
          })}
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(['button', 'is-warning'], {
            'is-light': !isReverse,
          })}
          onClick={() => setReverse(!isReverse)}
        >
          Reverse
        </button>

        {
          (sortField || isReverse) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
          >
            Reset
          </button>
          )
        }
      </div>

      <ul>
        {goods.map(good => (
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
