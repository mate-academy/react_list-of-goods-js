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
  const copyOfGoods = [...goodsFromServer];
  const [value, setState] = useState('');
  const [reserve, setReserve] = useState(false);

  copyOfGoods.sort((good1, good2) => {
    switch (value) {
      case 'Sort by length':
        return good1.length - good2.length;
      case 'Sort alphabetically':
        return good1.localeCompare(good2);
      default:
        return 0;
    }
  });
  if (reserve) {
    copyOfGoods.reverse();
  }

  const isLight = item => {
    return value === item ? '' : 'is-light';
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setState('Sort alphabetically')}
          type="button"
          className={`button is-info ${isLight('Sort alphabetically')}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setState('Sort by length')}
          type="button"
          className={`button is-success ${isLight('Sort by length')}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReserve(!reserve)}
          type="button"
          className={`button is-warning ${reserve ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {value || reserve ? (
          <button
            onClick={() => {
              setReserve(false);
              setState('');
            }}
            type="button"
            className={`button is-danger ${isLight('Reset')}`}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {copyOfGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
