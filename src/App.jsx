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

const SORT_BY_ALPHA = 'abs';
const SORT_BY_LENGTH = 'lng';

function modify(goods, sortBy, isReversed) {
  const visibleGoods = [...goods];

  if (sortBy === SORT_BY_ALPHA) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === SORT_BY_LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(null);
  const [reversed, setReversed] = useState(false);

  const goods = modify(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_BY_ALPHA
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SORT_BY_ALPHA)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_BY_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setReversed(stat => !stat)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(null);
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
