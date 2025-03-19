import { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';
import cl from 'classnames';

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
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  let goods = [...goodsFromServer];

  goods = goods.sort((a, b) => {
    if (sortField === 'alphabetically') {
      return a.localeCompare(b);
    }

    if (sortField === 'length') {
      return a.length - b.length;
    }

    return 0;
  });

  if (reversed) {
    goods = goods.reverse();
  }

  const resetClick = () => {
    setSortField('');
    if (reversed) {
      setReversed(!reversed);
    }
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cl('button', 'is-info', {
            'is-light': sortField !== 'alphabetically',
          })}
          onClick={() => setSortField('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cl('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cl('button', 'is-warning', {
            'is-light': reversed === false,
          })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
