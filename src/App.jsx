import './App.scss';
import 'bulma/css/bulma.css';

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

const SORT_FIELD = {
  LEN: 'len',
  NAME: 'name',
};

function getListGoods(goods, { sortField, reverse }) {
  const listGoods = [...goods];

  if (sortField) {
    listGoods.sort((goodB, goodA) => {
      switch (sortField) {
        case SORT_FIELD.LEN:
          return goodB.length - goodA.length;

        case SORT_FIELD.NAME:
          return goodB.localeCompare(goodA);

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    listGoods.reverse();
  }

  return listGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getListGoods(goodsFromServer, { sortField, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD.NAME,
          })}
          onClick={() => setSortField(SORT_FIELD.NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD.LEN,
          })}
          onClick={() => setSortField(SORT_FIELD.LEN)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
