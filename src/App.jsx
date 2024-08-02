import { useState } from 'react';
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

export const isArraySame = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((element, index) => element === arr2[index]);
};

export const clear = (...args) => {
  args.forEach(arg => arg(false));
};

export const App = () => {
  const [sortOrder, setSortOrder] = useState('');
  const [reversed, setReversed] = useState(false);
  const sortedGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortOrder) {
      case 'alphabetical':
        return good1.localeCompare(good2);
      case 'length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortOrder !== 'alphabetical',
          })}
          onClick={() => setSortOrder('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortOrder !== 'length',
          })}
          onClick={() => setSortOrder('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {!isArraySame(goodsFromServer, sortedGoods) && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => clear(setSortOrder, setReversed)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
