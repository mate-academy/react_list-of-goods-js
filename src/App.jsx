import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { reverseGoods } from './functions/reverseGoods';
import { sortGoods } from './functions/sortGoods';
import { ALPHABET, NO_SORT, LENTGH } from './constances';

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

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy !== ALPHABET && 'is-light'}`}
          onClick={() => {
            sortGoods(
              ALPHABET,
              setSortBy,
              setReversed,
              setGoods,
              [...goodsFromServer],
              reversed,
            );
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy !== LENTGH && 'is-light'}`}
          onClick={() => {
            sortGoods(
              LENTGH,
              setSortBy,
              setReversed,
              setGoods,
              [...goodsFromServer],
              reversed,
            );
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
              sortGoods(
                NO_SORT,
                setSortBy,
                setReversed,
                setGoods,
                [...goodsFromServer],
                reversed,
              );
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => <li data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
