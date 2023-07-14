import React, { useState } from 'react';
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

const SORT_FIELD_ALPHABETICLY = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

const getPreparedGoods = (goods, sortField, reversed) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABETICLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
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
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, sortField, reversed);

  const reset = () => {
    setReversed(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === SORT_FIELD_ALPHABETICLY
              ? 'button is-info '
              : 'button is-info  is-light'
          }
          onClick={() => setSortField(SORT_FIELD_ALPHABETICLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === SORT_FIELD_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            reversed
              ? 'button is-warning'
              : 'button is-warning is-light'
          }
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
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
        {goods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
