import 'bulma/css/bulma.css';
import './App.scss';
import { useState, useMemo } from 'react';

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
  const visibleGoods = useMemo(() => {
    const result = [...goodsFromServer];

    result.sort((a, b) => {
      switch (sortField) {
        case 'alph':
          return a.localeCompare(b);

        case 'lngth':
          return a.length - b.length;

        default:
          return 0;
      }
    });

    if (reversed) {
      result.reverse();
    }

    return result;
  }, [sortField, reversed]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === 'alph' ? 'button is-info' : 'button is-info is-light'
          }
          onClick={() => setSortField('alph')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === 'lngth'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField('lngth')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {(sortField !== '' || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReversed(false);
              setSortField('');
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
