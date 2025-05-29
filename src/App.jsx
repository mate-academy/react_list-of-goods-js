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

  let visibleGoods = [...goodsFromServer];

  if (sortField === 'alphabetically') {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortField === 'by length') {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  const isModified = sortField || reversed;

  const sortOptions = [
    { label: 'Sort alphabetically', value: 'alphabetically', className: 'is-info' },
    { label: 'Sort by length', value: 'by length', className: 'is-success' },
  ];

  return (
    <div className="section content">
      <div className="buttons">
        {sortOptions.map(({ label, value, className }) => (
          <button
            key={value}
            type="button"
            className={`button ${className} ${sortField !== value ? 'is-light' : ''}`}
            onClick={() => setSortField(value)}
          >
            {label}
          </button>
        ))}

        <button
          type="button"
          className={`button is-warning ${!reversed ? 'is-light' : ''}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger"
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
