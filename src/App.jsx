import React, { useState } from 'react';
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

export const App = () => {
  const [sortType, setSortType] = useState('');
  const [goods, setGoods] = useState(goodsFromServer);

  const handleSort = type => {
    const sortedGoods = [...goodsFromServer];

    if (type === 'alphabetical') {
      sortedGoods.sort();
    } else if (type === 'length') {
      sortedGoods.sort((a, b) => a.length - b.length);
    } else if (type === 'reverse') {
      sortedGoods.reverse();
    }

    setSortType(type);
    setGoods(sortedGoods);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabetical' ? '' : 'is-light'}`}
          onClick={() => handleSort('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => handleSort('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortType === 'reverse' ? '' : 'is-light'}`}
          onClick={() => handleSort('reverse')}
        >
          Reverse
        </button>

        {sortType && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => handleSort('')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
