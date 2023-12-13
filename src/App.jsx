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

const SORT_FIELD_ALPHABETICALLY = 'alphabetically';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, reversedField }) {
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

  if (reversedField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [reversedField, setReversedField] = useState(false);
  const [sortField, setSortField] = useState('');
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, reversedField },
  );

  function reset() {
    setSortField('');
    setReversedField(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info
          ${
            sortField !== SORT_FIELD_ALPHABETICALLY
              ? 'is-light'
              : ''
          }`}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success
          ${
            sortField !== SORT_FIELD_LENGTH
              ? 'is-light'
              : ''
          }`}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning
          ${
            !reversedField
              ? 'is-light'
              : ''
          }`}
          onClick={() => setReversedField(!reversedField)}
        >
          Reverse
        </button>

        {
          (sortField || reversedField)
            && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
            )
        }
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
