import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  const [sortBy, setSortBy] = useState('');
  const [goods, setGoods] = useState([...goodsFromServer]);

  function sortByAlph() {
    setGoods([...goodsFromServer].sort());
    setSortBy('alph');
  }

  function sortByLength() {
    setGoods([...goodsFromServer].sort((a, b) => a.length - b.length));
    setSortBy('length');
  }

  function reverse() {
    setGoods([...goods].reverse());
    setSortBy('reverse');
  }

  function reset() {
    setGoods([...goodsFromServer]);
    setSortBy('');
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlph}
          type="button"
          className={cn('button is-info', { 'is-light': sortBy === 'alph' })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn('button is-info', { 'is-light': sortBy === 'length' })}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn('button is-info', { 'is-light': sortBy === 'reverse' })}
        >
          Reverse
        </button>
        {sortBy !== '' && (
          <button
            onClick={reset}
            type="button"
            className={cn('button is-info', { 'is-light': sortBy === '' })}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {[...goods].map(good => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
