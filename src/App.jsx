import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
// eslint-disable-next-line no-unused-vars
import classNames from 'classnames';

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
  const [sortFields, setSortfield] = useState('');
  const [reversed, setReversed] = useState(false);

  let visibleGoods = [...goodsFromServer].sort((a, b) => {
    if (sortFields === 'alphabetically') {
      return a.localeCompare(b);
    }

    if (sortFields === 'by length') {
      return a.length - b.length;
    }

    return 0;
  });

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  const isOriginalOrder =
    JSON.stringify(visibleGoods) === JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortfield('alphabetically')}
          type="button"
          className={`button is-info ${sortFields === 'alphabetically' ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortfield('by length')}
          type="button"
          className={`button is-success ${sortFields === 'by length' ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>
        {!isOriginalOrder && (
          <button
            onClick={() => {
              setSortfield('');
              setReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
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
