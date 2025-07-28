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

const SORT_FIELD_ALPHA = 'Sort alphabetically';
const SORT_FIELD_LENGTH = 'Sort by length';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const goodList = [...goodsFromServer].sort((good1, good2) => {
    switch (sortField) {
      case SORT_FIELD_ALPHA:
        return good1.localeCompare(good2);
      case SORT_FIELD_LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (reversed) {
    goodList.reverse();
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
          className={`button is-info ${sortField === SORT_FIELD_ALPHA ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_ALPHA)}
        >
          Sort alphabetically
        </button>
        <button
          type="button"
          className={`button is-success ${sortField === SORT_FIELD_LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>
        <button
          type="button"
          className={`button is-warning ${reversed ? '' : 'is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>
        {(sortField !== '' || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>
      {goodList.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </div>
  );
};
