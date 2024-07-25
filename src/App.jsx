import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import classNames from 'classnames';
import { GoodsList } from './components/GoodsList';

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

const goods = goodsFromServer.map((good, id) => ({
  name: good,
  id,
}));

const ORDER_NATURAL = 'natural';
const ORDER_ALPHABETICALLY = 'alphabetically';
const ORDER_BY_LENGTH = 'by length';

function getGoodsToDisplay(array, order, reverse) {
  const goodsToDisplay = [...array];

  switch (order) {
    case ORDER_NATURAL:
      break;
    case ORDER_ALPHABETICALLY:
      goodsToDisplay.sort(({ name: a }, { name: b }) => a.localeCompare(b));
      break;
    case ORDER_BY_LENGTH:
      goodsToDisplay.sort(({ name: a }, { name: b }) => a.length - b.length);
      break;
    default:
      throw new Error(`"${order}" is not a valid sorting order`);
  }

  if (reverse) {
    goodsToDisplay.reverse();
  }

  return goodsToDisplay;
}

export const App = () => {
  const [order, setOrder] = useState(ORDER_NATURAL);
  const [reverse, setReverse] = useState(false);

  const isOrderedAlphabetically = order === ORDER_ALPHABETICALLY;
  const isOrderedByLength = order === ORDER_BY_LENGTH;
  const isResetMeaningful = order !== ORDER_NATURAL || reverse !== false;

  const goodsToDisplay = getGoodsToDisplay(goods, order, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setOrder(ORDER_ALPHABETICALLY)}
          type="button"
          className={classNames('button is-info', {
            'is-light': !isOrderedAlphabetically,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setOrder(ORDER_BY_LENGTH)}
          type="button"
          className={classNames('button is-success', {
            'is-light': !isOrderedByLength,
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

        {isResetMeaningful && (
          <button
            onClick={() => {
              setOrder(ORDER_NATURAL);
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={goodsToDisplay} />
    </div>
  );
};
