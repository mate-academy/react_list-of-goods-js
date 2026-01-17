import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

const SORT_PARAMETER_ALPHABET = 'alphabet';
const SORT_PARAMETER_LENGTH = 'length';

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

function getPreparedGoods(goods, { sortField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_PARAMETER_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_PARAMETER_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  let visibleGoods = getPreparedGoods(goodsFromServer, { sortField });
  const [reversed, setReversed] = useState(false);

  const isChanged = sortField !== '' || reversed;

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_PARAMETER_ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SORT_PARAMETER_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_PARAMETER_LENGTH
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SORT_PARAMETER_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed === true
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-warning"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
