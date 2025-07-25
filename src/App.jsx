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
  const SORT_ABC = 'sortABC';
  const SORT_LENGTH = 'sortLength';
  let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SORT_ABC:
        return good1.localeCompare(good2);
      case SORT_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reversed) {
    visibleGoods = visibleGoods.reverse();
  }

  const reset = () => {
    setSortField('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField === SORT_ABC ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_ABC)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortField === SORT_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => {
            setReversed(prev => !prev);
          }}
        >
          Reverse
        </button>
        {visibleGoods.some((item, i) => item !== goodsFromServer[i]) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
