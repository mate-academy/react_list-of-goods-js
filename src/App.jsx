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
const SORT_ALPHABET = 'alphabet';
const SORT_LENGTH = 'length';
const RESET = 'reset';
const REVERSE = false;

function filteredGoods(goods, filter, reversed, setFilter) {
  let result = [...goods];

  if (filter === SORT_ALPHABET) {
    result.sort((a, b) => a.localeCompare(b));
  }

  if (filter === SORT_LENGTH) {
    result.sort((a, b) => a.length - b.length);
  }

  if (reversed === true) {
    result = result.reverse();
  }

  if (filter === RESET) {
    result = [...goodsFromServer];
    setFilter('');
  }

  return result;
}

export const App = () => {
  const [filter, setFilter] = useState('');
  const [reverseToggle, setReverseToggle] = useState(REVERSE);

  function reset() {
    setFilter(RESET);
    setReverseToggle(REVERSE);
  }

  const goods = filteredGoods(
    goodsFromServer,
    filter,
    reverseToggle,
    setFilter,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${filter !== SORT_ALPHABET && 'is-light'}`}
          onClick={() => setFilter(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${filter !== SORT_LENGTH && 'is-light'}`}
          onClick={() => setFilter(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverseToggle && 'is-light'}`}
          onClick={() => setReverseToggle(!reverseToggle)}
        >
          Reverse
        </button>
        {filter || reverseToggle ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {goods.map(good => {
          return (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
