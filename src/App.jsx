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
      switch (true) {
        case goodsSortBy === 'abc':
          return good1 > good2 ? 1 : -1;

        case goodsSortBy === 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse % 2 === 0) {
    goodsPrepared = goodsPrepared.reverse();
  }

  return goodsPrepared;
}

let COUNTER_PLUS = 1;

export const App = () => {
  const [query, setQuery] = useState('');
  const [reverse, setReverse] = useState(1);
  const renderingGoods = getGoodsPrepared(goodsFromServer, query, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': query === '' || query === 'length',
          })}
          onClick={() => {
            setQuery('abc');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': query === '' || query === 'abc',
          })}
          onClick={() => {
            setQuery('length');
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': reverse % 2 !== 0,
          })}
          onClick={() => {
            setReverse((COUNTER_PLUS += 1));
          }}
        >
          Reverse
        </button>

        {(query || reverse % 2 === 0) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(1);
              setQuery('');
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {renderingGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
