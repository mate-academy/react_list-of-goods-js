/* eslint-disable function-paren-newline */
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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

let goods = [...goodsFromServer];
let isReverseCLicked = false;

export const App = () => {
  const ALPHABETICALLY = 'alphabetically';
  const BY_LENGTH = 'by length';
  const RESET = 'reset';
  const [sortGoods, setSortGoods] = useState('');
  const [reverse, setReversed] = useState(false);

  function fSort() {
    if (sortGoods === ALPHABETICALLY) {
      goods = [...goodsFromServer].sort((goodA, goodB) =>
        goodA.localeCompare(goodB),
      );
    }

    if (sortGoods === BY_LENGTH) {
      goods = [...goodsFromServer].sort(
        (goodA, goodB) => goodA.length - goodB.length,
      );
    }

    if (reverse) {
      goods.reverse();
    }
  }

  if (sortGoods === RESET) {
    goods = [...goodsFromServer];
  }

  if (isReverseCLicked) {
    goods.reverse();
    isReverseCLicked = false;
  } else {
    fSort();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortGoods !== ALPHABETICALLY,
          })}
          onClick={() => setSortGoods(ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortGoods !== BY_LENGTH,
          })}
          onClick={() => setSortGoods(BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': reverse === false,
          })}
          onClick={() => {
            setReversed(!reverse);
            isReverseCLicked = true;
          }}
        >
          Reverse
        </button>
        {goods.some((good, index) => good !== goodsFromServer[index]) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortGoods(RESET);
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
