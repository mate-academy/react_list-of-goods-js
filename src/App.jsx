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

const defaultState = {
  reversed: false,
  isLength: false,
  alphabetically: false,
};

export const App = () => {
  const [goodsState, setGoodsState] = useState(defaultState);
  const { reversed, isLength, alphabetically } = goodsState;

  const getSortedGoods = () => {
    const goods = [...goodsFromServer];

    if (isLength || alphabetically) {
      goods.sort((a, b) => {
        if (isLength) {
          return a.length - b.length;
        }

        return a.localeCompare(b);
      });
    }

    if (reversed) {
      goods.reverse();
    }

    return goods;
  };

  const resetOrder = () => {
    setGoodsState(defaultState);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${alphabetically ? '' : 'is-light'}`}
          onClick={() =>
            setGoodsState({
              ...goodsState,
              alphabetically: true,
              isLength: false,
            })
          }
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isLength ? '' : 'is-light'}`}
          onClick={() =>
            setGoodsState({
              ...goodsState,
              isLength: true,
              alphabetically: false,
            })
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() =>
            setGoodsState({
              ...goodsState,
              reversed: !reversed,
            })
          }
        >
          Reverse
        </button>

        {reversed || isLength || alphabetically ? (
          <button
            type="button"
            className="button is-danger"
            onClick={resetOrder}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {getSortedGoods().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
