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

const SORT_FIELDS_ALPHABET = 'alphabetically';
const SORT_FIELDS_LENGTH = 'length';

function getPrepared(goods, sortField) {
  const preparedGoods = [...goods];

  switch (sortField) {
    case SORT_FIELDS_ALPHABET:
      preparedGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_FIELDS_LENGTH:
      preparedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  let visibleGoods = getPrepared(goodsFromServer, sortField);

  if (reversed) {
    visibleGoods = [...visibleGoods].reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_FIELDS_ALPHABET
              ? 'button is-info'
              : 'button is-info is-light'
          }
          onClick={() => setSortField(SORT_FIELDS_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_FIELDS_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SORT_FIELDS_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {sortField || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
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
