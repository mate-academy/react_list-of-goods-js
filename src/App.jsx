import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
import cl from 'clsx';

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
  const [sortedField, setSortedField] = useState('');
  const [reversed, setReversed] = useState(false);

  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortedField) {
      case 'Sort alphabetically':
        return good1.localeCompare(good2);
      case 'Sort by length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cl('button', 'is-info', {
            'is-light': sortedField !== 'Sort alphabetically',
          })}
          onClick={() => setSortedField('Sort alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cl('button', 'is-success', {
            'is-light': sortedField !== 'Sort by length',
          })}
          onClick={() => setSortedField('Sort by length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cl('button', 'is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortedField !== '' || reversed === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortedField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
