import React, { useState } from 'react';
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

const SORT_BY_NAME = 'name';
const SORT_BY_LENGTH = 'length';

function getPreparedGoods(sortField, reverse) {
  let goods = [...goodsFromServer];

  if (sortField === SORT_BY_NAME) {
    goods = goods.sort((a, b) => a.localeCompare(b));
  } else if (sortField === SORT_BY_LENGTH) {
    goods = goods.sort((a, b) => a.length - b.length);
  }

  if (reverse) {
    goods = goods.reverse();
  }

  return goods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const goods = getPreparedGoods(sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_BY_NAME ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_BY_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortField === SORT_BY_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverse ? '' : 'is-light'}`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setSortField('');
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(item => (
          <React.Fragment key={item}>
            <li data-cy="Good">{item}</li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};
