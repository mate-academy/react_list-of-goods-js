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

const SORT_FIELD_BY_DEFAULT = 'default';
const SORT_FIELD_BY_ALPHABET = 'alphabet';
const SORT_FIELD_BY_LENGTH = 'length';

function getPrepearedGoods(goods, { sortField, reverseStatus }) {
  const prepearedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELD_BY_ALPHABET:
      prepearedGoods.sort((good1, good2) => good1.localeCompare(good2));

      break;

    case SORT_FIELD_BY_LENGTH:
      prepearedGoods.sort((good1, good2) => (good1.length - good2.length));

      break;

    default:
      break;
  }

  if (reverseStatus) {
    prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SORT_FIELD_BY_DEFAULT);
  const [reverseStatus, setReverseStatus] = useState(false);

  const visibleGoods
    = getPrepearedGoods(goodsFromServer, { sortField, reverseStatus });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SORT_FIELD_BY_ALPHABET && 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SORT_FIELD_BY_LENGTH && 'is-light'}`}
          onClick={() => setSortField(SORT_FIELD_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${reverseStatus === false && 'is-light'}`}
          onClick={() => {
            if (reverseStatus === false) {
              setReverseStatus(true);
            } else {
              setReverseStatus(false);
            }
          }}
        >
          Reverse
        </button>

        {(sortField !== SORT_FIELD_BY_DEFAULT || reverseStatus === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SORT_FIELD_BY_DEFAULT);
              setReverseStatus(false);
            }}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => <li data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
