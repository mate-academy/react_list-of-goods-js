import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
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

export const App = () => {
  const [sort, setSort] = useState('none');
  const [reversed, setReversed] = useState(false);

  function getSortedGoods() {
    const result = [...goodsFromServer];

    if (sort === 'alph') {
      result.sort((a, b) => a.localeCompare(b));
    } else if (sort === 'len') {
      result.sort((a, b) => a.length - b.length);
    }

    if (reversed) {
      result.reverse();
    }

    return result;
  }

  const displayedGoods = getSortedGoods();

  const showReset =
    sort !== 'none' ||
    reversed ||
    displayedGoods.join() !== goodsFromServer.join();

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', { 'is-light': sort !== 'alph' })}
          onClick={() => {
            setSort('alph');
            setReversed(false);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', { 'is-light': sort !== 'len' })}
          onClick={() => {
            setSort('len');
            setReversed(false);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSort('none');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {displayedGoods.map(good => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
