import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_NAME = 'name';

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

function getPreparedGoods(goods, { sortField, reverseField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        case SORT_FIELD_NAME:
          return good1.localeCompare(good2);

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
  const [reverseField, setReverseField] = useState();
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, reverseField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          className={cn('button is-info', { 'is-light':
            sortField !== SORT_FIELD_NAME })}
          onClick={() => setSortField(SORT_FIELD_NAME)}
          type="button"
        >
          Sort alphabetically
        </button>

        <button
          className={cn('button is-success', { 'is-light':
            sortField !== SORT_FIELD_LENGTH })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
        >
          Sort by length
        </button>

        <button
          className={cn('button is-warning', { 'is-light':
            !reverseField })}
          onClick={() => setReverseField(!reverseField)}
          type="button"
        >
          Reverse
        </button>

        {(sortField || reverseField)
        && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseField(undefined);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={crypto.randomUUID()}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
