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

const SORT_ALPH = 'alph';
const SORT_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, reversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_ALPH:
          return good1.localeCompare(good2);
        case SORT_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  const alphBtn = SORT_ALPH === sortField ? 'is-info' : ' is-info is-light';
  const lengthBtn
    = SORT_LENGTH === sortField ? 'is-success ' : ' is-success is-light';
  const reverseBtn = reversed ? 'is-warning' : 'is-warning is-light';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button ${alphBtn}`}
          onClick={() => setSortField(SORT_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${lengthBtn}`}
          onClick={() => setSortField(SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${reverseBtn}`}
          onClick={() => setReversed(revers => !revers)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
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
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
