import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

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

const SORT_BY_ABC = 'abc';
const SORT_BY_LEN = 'len';

function isSortedGoods(goods, sortBy, isReserved) {
  const visibleGoods = [...goods];

  switch (sortBy) {
    case SORT_BY_ABC:
      visibleGoods.sort();
      break;
    case SORT_BY_LEN:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
  }

  if (isReserved) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortedGoods, setSortedGoods] = useState('');
  const [reversed, setReversed] = useState(false);

  const goods = isSortedGoods(goodsFromServer, sortedGoods, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortedGoods === SORT_BY_ABC ? '' : 'is-light'}`}
          onClick={() => setSortedGoods(SORT_BY_ABC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortedGoods === SORT_BY_LEN ? '' : 'is-light'}`}
          onClick={() => setSortedGoods(SORT_BY_LEN)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-success ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortedGoods || reversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setSortedGoods(null);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
