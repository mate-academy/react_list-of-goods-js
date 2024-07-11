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

function getGoodsPrepared(goods, query1, query2, reverse) {
  let goodsPrepared = [...goods];

  if (query1 === 'abc') {
    goodsPrepared = goodsPrepared.sort((good1, good2) => {
      return good1 > good2 ? 1 : -1;
    });
  }

  if (query2 === 'length') {
    goodsPrepared = goodsPrepared.sort((good1, good2) => {
      return good1.length - good2.length;
    });
  }

  if (reverse % 2 === 0) {
    goodsPrepared = goodsPrepared.reverse();
  }

  return goodsPrepared;
}

let COUNTER_PLUS = 1;

export const App = () => {
  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');
  const [reverse, setReverse] = useState(1);
  const renderingGoods = getGoodsPrepared(
    goodsFromServer,
    query1,
    query2,
    reverse,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': query1 === '',
          })}
          onClick={() => {
            setQuery1('abc');
            setQuery2('');
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': query2 === '',
          })}
          onClick={() => {
            setQuery1('');
            setQuery2('length');
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

        {(query1 || query2 || reverse % 2 === 0) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setQuery1('');
              setQuery2('');
              setReverse(1);
            }}
          >
            Reset
          </button>
        )}
      </div>

      {renderingGoods.map(good => (
        <ul>
          <li data-cy="Good">{good}</li>
        </ul>
      ))}
    </div>
  );
};
