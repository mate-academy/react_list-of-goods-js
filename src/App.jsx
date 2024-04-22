import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import {
  goodsFromServer,
  SORT_TYPE,
  filteredGoods,
} from './utils/filteredGoods';

export const App = () => {
  const [filter, setFilter] = useState('');
  const [reverseToggle, setReverseToggle] = useState(SORT_TYPE.REVERSE);

  function reset() {
    setFilter(SORT_TYPE.RESET);
    setReverseToggle(SORT_TYPE.REVERSE);
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
          className={`button is-info ${filter !== SORT_TYPE.SORT_ALPHABET && 'is-light'}`}
          onClick={() => setFilter(SORT_TYPE.SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${filter !== SORT_TYPE.SORT_LENGTH && 'is-light'}`}
          onClick={() => setFilter(SORT_TYPE.SORT_LENGTH)}
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
        ) : null}
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
