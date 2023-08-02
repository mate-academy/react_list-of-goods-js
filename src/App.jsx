import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';
import { useState } from 'react';

const SORT_FIELD_ALPHABET = 'name';
const SORT_FIELD_LENGTH = 'length';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Ice cream',
  'Garlic',
];

function getPreparedGoods(goods, { sortField, reverseField }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((element1, element2) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return element1[sortField] - element2[sortField];

        case SORT_FIELD_ALPHABET:
          return element1.localeCompare(element2);

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
  const [reverseField, setReverseField] = useState('');
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, reverseField });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reverseField })}
        >
          Reverse
        </button>

        {
          (sortField || reverseField) && (
            <button
              onClick={() => {
                setReverseField('');
                setSortField('');
              }}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {visibleGoods.map(element => (
          <li data-cy="Good">{element}</li>
        ))}
      </ul>
    </div>
  );
};
