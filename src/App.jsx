import React, { useState } from 'react';
import cn from 'classnames';
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

const sortTypes = {
  NONE: '',
  ASC: 'asc',
  LENGTH: 'length',
};

function getPreparedGoods(goods, sortType, reverse) {
  const prepared = [...goods];

  switch (sortType) {
    case sortTypes.ASC:
      prepared.sort((a, b) => a.localeCompare(b));
      break;
    case sortTypes.LENGTH:
      prepared.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (reverse) {
    prepared.reverse();
  }

  return prepared;
}

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, reverse);

  const reset = () => {
    setSortType('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(sortTypes.ASC)}
          type="button"
          className={cn('button', 'is-info', 'is-light', {
            'is-selected': sortType === sortTypes.ASC,
          })}
        >
          Sort alphabetically (ASC)
        </button>

        <button
          onClick={() => setSortType(sortTypes.LENGTH)}
          type="button"
          className={cn('button', 'is-info', 'is-light', {
            'is-selected': sortType === sortTypes.LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(prev => !prev)}
          type="button"
          className={cn('button', 'is-warning', 'is-light', {
            'is-selected': reverse,
          })}
        >
          {reverse ? 'Unreverse' : 'Reverse'}
        </button>

        <button onClick={reset} type="button" className="button">
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
