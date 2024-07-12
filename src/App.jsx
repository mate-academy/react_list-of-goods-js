import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

function getGoodsPrepared(goods, goodsSortBy, reverse) {
  let goodsPrepared = [...goods];

  if (goodsSortBy) {
    goodsPrepared = goodsPrepared.sort((good1, good2) => {
      switch (goodsSortBy) {
        case 'abc':
          return good1 > good2 ? 1 : -1;

        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    goodsPrepared = goodsPrepared.reverse();
  }

  return goodsPrepared;
}

// let COUNTER_PLUS = 1;

export const App = () => {
  const [goodsSortBy, setGoodsSortBy] = useState('');
  const [reverse, setReverse] = useState(false);
  const renderingGoods = getGoodsPrepared(
    goodsFromServer,
    goodsSortBy,
    reverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': goodsSortBy === '' || goodsSortBy === 'length',
          })}
          onClick={() => {
            setGoodsSortBy('abc');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': goodsSortBy === '' || goodsSortBy === 'abc',
          })}
          onClick={() => {
            setGoodsSortBy('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverse === false,
          })}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(goodsSortBy || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setGoodsSortBy('');
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {renderingGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
