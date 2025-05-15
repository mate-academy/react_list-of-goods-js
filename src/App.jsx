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
  const [sorted, setSorted] = useState(false);
  let sortedGoods = [...goodsFromServer].sort((a, b) => {
    if (sortField === 'alphabetical') {
      return a.localeCompare(b);
    }

    if (sortField === 'length') {
      return a.length - b.length;
    }

    return 0;
  });

  if (reversed) {
    sortedGoods = sortedGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === 'alphabetical'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField('alphabetical');
            setSorted(true);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === 'length'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => {
            setSortField('length');
            setSorted(true);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reversed ? 'button is-info' : 'button is-info is-light'}
          onClick={() => {
            setReversed(!reversed);
            if (sortField === '') {
              setSorted(!sorted);
            }
          }}
        >
          Reverse
        </button>
        {sorted && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
              setSorted(false);
            }}
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
