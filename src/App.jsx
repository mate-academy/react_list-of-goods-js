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

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

function getPreperedGoods(goods, { sortField }) {
  const preperedGoods = [...goods];

  if (sortField) {
    switch (sortField) {
      case SORT_FIELD_ALPHABET:
        preperedGoods.sort((good1, good2) => good1.localeCompare(good2));

        break;
      case SORT_FIELD_LENGTH:
        preperedGoods.sort((good1, good2) => good1.length - good2.length);

        break;

      default:
        break;
    }
  }

  return preperedGoods;
}

// setSelectedGood(selectedGood === currentGood ? null : currentGood)

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreperedGoods(goodsFromServer, { sortField });

  if (reverse) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          className={`button ${sortField === SORT_FIELD_ALPHABET ? 'is-info' : 'is-info is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={`button ${sortField === SORT_FIELD_LENGTH ? 'is-success' : 'is-success is-light'}`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => {
            if (reverse === true) {
              visibleGoods.reverse();
              setReverse(false);
            } else {
              visibleGoods.reverse();
              setReverse(true);
            }
          }}
          className={`button ${reverse ? 'is-warning' : 'is-warning is-light'}`}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            onClick={() => {
              setSortField(null);
              setReverse(false);
            }}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <div>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good">{good}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
