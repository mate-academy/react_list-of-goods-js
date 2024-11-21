import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import classNames from 'classnames';
import { GoodsList } from './GoodsList/GoodsList';

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

const goods = goodsFromServer.map((good, index) => ({
  name: good,
  id: index,
}));

const ORDER_BY_LENGTH = 'length';
const ORDER_BY_DEFAULT = 'default';
const ORDER_BY_ALPHABET = 'alphabet';

const getGoods = (array, order, reverse) => {
  const changedGoods = [...array];

  switch (order) {
    case ORDER_BY_DEFAULT:
      break;
    case ORDER_BY_ALPHABET:
      changedGoods.sort(({ name: a }, { name: b }) => a.localeCompare(b));
      break;
    case ORDER_BY_LENGTH:
      changedGoods.sort(({ name: a }, { name: b }) => a.length - b.length);
      break;
    default:
      throw new Error(`not valid`);
  }

  if (reverse) {
    changedGoods.reverse();
  }

  return changedGoods;
};

export const App = () => {
  const [order, setOrder] = useState(ORDER_BY_DEFAULT);
  const [reverse, setReverse] = useState(false);

  const isByAlphabet = order === ORDER_BY_ALPHABET;
  const isByLength = order === ORDER_BY_LENGTH;
  const isReset = order !== ORDER_BY_DEFAULT || reverse;

  const changedGoods = getGoods(goods, order, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setOrder(ORDER_BY_ALPHABET)}
          type="button"
          className={classNames('button is-info', {
            'is-light': !isByAlphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setOrder(ORDER_BY_LENGTH)}
          type="button"
          className={classNames('button is-success', {
            'is-light': !isByLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={classNames('button is-warning', { 'is-light': !reverse })}
        >
          Reverse
        </button>

        {isReset && (
          <button
            onClick={() => {
              setOrder(ORDER_BY_DEFAULT);
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={changedGoods} />
    </div>
  );
};
