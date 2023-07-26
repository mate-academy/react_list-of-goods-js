import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { reverseGoods } from './functions/reverseGoods';
import { sortGoods } from './functions/sortGoods';
import { ALPHABET, NO_SORT, LENGTH } from './constances';

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

export const App = () => {
  const [sortBy, setSortBy] = useState(NO_SORT);
  const [reversed, setReversed] = useState(false);
  const [goods, setGoods] = useState([...goodsFromServer]);

  const argsForSortGoods = typeOfSorting => ([
    typeOfSorting,
    setSortBy,
    setReversed,
    setGoods,
    [...goodsFromServer],
    reversed,
  ]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== ALPHABET && 'is-light'}`}
          onClick={() => {
            sortGoods(...argsForSortGoods(ALPHABET));
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== LENGTH && 'is-light'}`}
          onClick={() => {
            sortGoods(...argsForSortGoods(LENGTH));
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed !== true && 'is-light'}`}
          onClick={() => {
            reverseGoods(goods, reversed, setReversed, setGoods);
          }}
        >
          Reverse
        </button>

        {(sortBy !== NO_SORT || reversed === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              sortGoods(...argsForSortGoods(NO_SORT));
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => <li key={good} data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
