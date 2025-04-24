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
  const [goods, setGoods] = useState(goodsFromServer);
  const [reversed, setReversed] = useState(false);

  let visibleGoods = [...goods];

  if (sortField === 'alphabetical') {
    visibleGoods = [...visibleGoods].sort((a, b) => a.localeCompare(b));
  } else if (sortField === 'length') {
    visibleGoods = [...visibleGoods].sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== 'alphabetical' ? 'is-light' : ''}`}
          onClick={() => setSortField('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${sortField !== 'length' ? 'is-light' : ''}`}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reversed ? 'is-light' : ''}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setGoods(goodsFromServer);
              setSortField('');
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
