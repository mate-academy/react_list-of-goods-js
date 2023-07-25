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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABET = 'alphabet';
const REVERSE_FIELD = '+';

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setRevField] = useState('');
  const visibleGoods = [...goodsFromServer];

  if (sortField) {
    visibleGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        case SORT_FIELD_ALPHABET:
          if (good1.toLowerCase() < good2.toLowerCase()) {
            return -1;
          }

          if (good1.toLowerCase() > good2.toLowerCase()) {
            return 1;
          }

          return 0;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => (setSortField(SORT_FIELD_ALPHABET))}
          className={`button is-info ${sortField !== SORT_FIELD_ALPHABET && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => (setSortField(SORT_FIELD_LENGTH))}
          className={`button is-success ${sortField !== SORT_FIELD_LENGTH && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseField !== REVERSE_FIELD && 'is-light'
          }`}
          onClick={() => (reverseField
            ? setRevField('')
            : setRevField(REVERSE_FIELD)
          )}
        >
          Reverse
        </button>

        {(reverseField || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setRevField('');
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
