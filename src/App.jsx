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
const SORT_FIELD_ALPHABETECALLY = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreparedArray(goodsArray, sortField, reversed) {
  let preparedArray = [...goodsArray];

  if (sortField) {
    preparedArray = preparedArray.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETECALLY:
          return good1.localeCompare(good2);
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedArray = preparedArray.reverse();
  }

  return preparedArray;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseArray, setReverseArray] = useState(false);
  const visibleGood = getPreparedArray(
    goodsFromServer,
    sortField,
    reverseArray,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_ALPHABETECALLY ? 'is-light' : ''}`}
          onClick={() => setSortField(SORT_FIELD_ALPHABETECALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH ? 'is-light' : ''}`}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverseArray ? 'is-light' : ''}`}
          onClick={() => setReverseArray(!reverseArray)}
        >
          Reverse
        </button>
        {visibleGood[0] !== goodsFromServer[0] ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseArray(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleGood.map((good, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
