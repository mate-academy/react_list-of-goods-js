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

const SORT_FIELD = {
  None: '',
  Length: 'length',
  Alphabetically: 'alphabetically'
};

const sortList = (goods, sortBy, isReversed) => {
  const sortedGoods = [...goods].sort((a, b) => {
    switch (sortBy) {
      case SORT_FIELD.Alphabetically:
        return a.localeCompare(b);
      case SORT_FIELD.Length:
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
  const [sortedBy, setSortedBy] = useState(SORT_FIELD.None);
  const [reversed, setReversed] = useState(false);

  const sortedGoods = sortList(goodsFromServer, sortedBy, reversed);

  const resetGoods = () => {
    setSortedBy(SORT_FIELD.None);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortedBy !== SORT_FIELD.Alphabetically,
          })}
          onClick={() => setSortedBy(SORT_FIELD.Alphabetically)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortedBy !== SORT_FIELD.Length,
          })}
          onClick={() => setSortedBy(SORT_FIELD.Length)}
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
        {(sortedBy !== SORT_FIELD.None || reversed) && (
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
