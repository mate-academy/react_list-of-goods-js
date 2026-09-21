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

  const sortedGoods = [...goodsFromServer].sort((a, b) => {
    if (sortField === 'alphabetically') {
      return a.localeCompare(b);
    }

    if (sortField === 'length') {
      return a.length - b.length;
    }

    return 0;
  });

  const [reversed, setReversed] = useState(false);

  const visibleGoods = reversed
    ? [...sortedGoods].reverse()
    : sortedGoods;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField('alphabetically')}
          type="button"
          className={
            sortField === 'alphabetically'
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField('length')}
          type="button"
          className={
            sortField === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed
              ? 'button is-warning'
              : 'button is-warning is-light'
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
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}

        
      </ul>
    </div>
  );
};
