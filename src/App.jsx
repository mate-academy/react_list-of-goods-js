import classNames from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

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

  let visibleGoods = [...goodsFromServer];

  if (sortField === 'alphabetically') {
    visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortField === 'byLength') {
    visibleGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const reset = () => {
    setSortField('');
    setReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', {
            'is-info': sortField === 'alphabetically',
            'is-light': sortField !== 'alphabetically',
          })}
          onClick={() => setSortField('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-success': sortField === 'byLength',
            'is-light': sortField !== 'byLength',
          })}
          onClick={() => setSortField('byLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-warning': reversed,
            'is-light': !reversed,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className={classNames('button', {
              'is-danger': sortField === 'reset',
              'is-light': sortField !== 'reset',
            })}
            onClick={() => reset()}
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
