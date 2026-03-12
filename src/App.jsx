import { useState } from 'react';
import classNames from 'classnames';

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

const SORT_ALPHABET = 'alphabetically';
const SORT_LENGTH = 'length';

const sortList = (goods, sortedBy, isReversed) => {
  const sortedGoods = [...goods].sort((a, b) => {
    switch (sortedBy) {
      case SORT_ALPHABET:
        return a.localeCompare(b);

      case SORT_LENGTH:
        return a.length - b.length;
      default:
        return 0;
    }
  });
  if (isReversed) {
    sortedGoods.reverse();
  }
  return sortedGoods;
}

export const App = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [sortedBy, setSortedBy] = useState('');
  const [reversed, setReversed] = useState(false);

  const sortedGoods = sortList(goods, sortedBy, reversed);
  const resetGoods = () => {
  setGoods(goodsFromServer);
  setSortedBy('');
  setReversed(false);
};
  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', { 'is-light': sortedBy !== SORT_ALPHABET })}
          onClick={() => setSortedBy(SORT_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', { 'is-light': sortedBy !== SORT_LENGTH })}
          onClick={() => setSortedBy(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortedBy || reversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
