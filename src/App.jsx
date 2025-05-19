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

function getPreparedGoods(goods, { sortField, reverse }) {
  if (!sortField) {
    return reverse ? [...goods].reverse() : [...goods];
  }

  const preparedGoods = [...goods];

  if (sortField === SORT_FIELD_ALPHABETICALLY) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortField === SORT_FIELD_LENGTH) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${sortField === SORT_FIELD_ALPHABETICALLY ? '' : ' is-light'}`}
          onClick={() => setSortField(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${sortField === SORT_FIELD_LENGTH ? '' : ' is-light'}`}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${reverse ? '' : ' is-light'}`}
          onClick={() => setReverse(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
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
