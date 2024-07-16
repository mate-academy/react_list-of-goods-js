import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

const goodsFromServer = [
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
const sortList = (goods, sortBy, isReversed) => {
  const sortedGoods = [...goods].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetically':
        return a.localeCompare(b);

      case 'length':
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

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
          className={classNames('button', 'is-info', {
            'is-light': sortedBy !== 'alphabetically',
          })}
          onClick={() => setSortedBy('alphabetically')}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortedBy !== 'length',
          })}
          onClick={() => setSortedBy('length')}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>
        {sortedBy.length > 0 ||
          (reversed && (
            <button
              type="button"
              className="button is-danger"
              onClick={resetGoods}
            >
              Reset
            </button>
          ))}
      </div>
      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
