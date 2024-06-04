import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

function prepGoods(goods, oper, revOp) {
  const tempArr = goods.sort((g1, g2) => {
    switch (oper) {
      case SORT_ALPH:
        return g1.localeCompare(g2);
      case SORT_LENGTH:
        return g1.length - g2.length;
      default:
        return 0;
    }
  });

  return revOp ? tempArr.reverse() : tempArr;
}

const SORT_ALPH = 'alpabet';
const SORT_LENGTH = 'length';

export const App = () => {
  const [sortBy, setSortBy] = useState('');
  const [rev, setRev] = useState(false);

  const visGoods = prepGoods([...goodsFromServer], sortBy, rev);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SORT_ALPH,
          })}
          onClick={() => setSortBy(SORT_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SORT_LENGTH,
          })}
          onClick={() => setSortBy(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-danger', {
            'is-light': !rev,
          })}
          onClick={() => setRev(!rev)}
        >
          Reverse
        </button>

        {sortBy || rev ? (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortBy('');
              setRev(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>
      <ul>
        {visGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
