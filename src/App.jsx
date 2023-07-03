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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, sortField, reverseField) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
          type="button"
          className={`button ${sortField === SORT_FIELD_ALPHABETICALLY ? 'is-info' : 'is-info is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={`button ${sortField === SORT_FIELD_LENGTH ? 'is-success' : 'is-success is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className={`button ${reverseField ? 'is-warning' : 'is-warning is-light'}`}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            onClick={() => {
              setSortField('');
              setReverseField(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
