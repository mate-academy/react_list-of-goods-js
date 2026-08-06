import { useState } from 'react';

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
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  let sGoods = [...goodsFromServer];

  if (sortField === 'alphabetically') {
    sGoods = [...sGoods].sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortField === 'byLength') {
    sGoods = [...sGoods].sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    sGoods = [...sGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === 'alphabetically' ? '' : 'is-light'}`}
          onClick={() => setSortField('alphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortField === 'byLength' ? '' : 'is-light'}`}
          onClick={() => setSortField('byLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField !== '' || reversed) && (
          <button
            type="button"
            className={`button is-info ${sortField === 'reset' ? '' : 'is-light'}`}
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
