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
  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case 'sortAlphabetically':
        return good1[0].localeCompare(good2[0]);
      case 'sortLength':
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  function Reset() {
    setSortField('');

    setReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === 'sortAlphabetically'
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField('sortAlphabetically')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === 'sortLength'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField('sortLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed ? 'button is-warning ' : 'button is-warning is-light'
          }
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {reversed || sortField ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              Reset();
            }}
          >
            Reset
          </button>
        ) : (
          <div> </div>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
