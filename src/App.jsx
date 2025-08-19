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
  const [reverse, setReverse] = useState(false);
  let visibleGoods = [...goodsFromServer];

  if (sortField === 'alphabetical') {
    visibleGoods = visibleGoods.toSorted((a, b) => a.localeCompare(b));
  }

  if (sortField === 'length') {
    visibleGoods = visibleGoods.toSorted((a, b) => a.length - b.length);
  }

  if (reverse) {
    visibleGoods = visibleGoods.toReversed();
  }

  const alphaLight = sortField !== 'alphabetical' ? 'is-light' : '';
  const lengthLight = sortField !== 'length' ? 'is-light' : '';
  const reverseLight = !reverse ? 'is-light' : '';
  const resetVisible = sortField !== '' || reverse;
  const clearAll = () => {
    setSortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${alphaLight}`}
          onClick={() => setSortField('alphabetical')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${lengthLight}`}
          onClick={() => setSortField('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseLight}`}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {resetVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => clearAll()}
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
